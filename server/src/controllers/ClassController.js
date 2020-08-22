const { connection: { db } } = require('../database');
const { convertHoursToMinutes } = require('../utils');

module.exports = class ClassController {
    static async index(req, res) {
        const filters = req.query;

        if (!filters.week_day || !filters.matter || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHoursToMinutes(filters.time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.matter', '=', filters.matter)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);


        res.json(classes);
    }

    static async create(req, res) {
        const {
            name,
            avatar,
            description,
            whatsapp,
            matter,
            price,
            schedule
        } = req.body;

        const trx = await db.transaction();

        try {
            const [user_id] = await trx('users').insert({ name, avatar, description, whatsapp });
            const [class_id] = await trx('classes').insert({ matter, price, user_id });

            const newSchedule = schedule.map(({ week_day, from, to }) => {
                return {
                    class_id,
                    week_day,
                    from: convertHoursToMinutes(from),
                    to: convertHoursToMinutes(to)
                };
            });

            await trx('class_schedule').insert(newSchedule);

            await trx.commit();

            return res.status(201).send();
        } catch (e) {
            await trx.rollback();
            return res.status(400).json({ error: 'Unexpected error while create new class' });
        }
    }

};
