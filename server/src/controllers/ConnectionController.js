const { connection: { db } } = require('../database');

module.exports = class ConnectionController {
    static async index(req, res) {
        const [{ total }] = await db('connections').count('* as total');

        return res.json({ total });
    }

    static async create(req, res) {
        const { user_id } = req.body;
        await db('connections').insert({ user_id });

        return res.status(201).send();
    }
};
