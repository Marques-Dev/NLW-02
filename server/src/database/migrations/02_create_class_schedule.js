module.exports = {
    up: async knex => {
        return knex.schema.createTable('class_schedule', table => {
            table.increments('id').primary();

            table.integer('week_day').notNullable();
            table.integer('from').notNullable();
            table.integer('to').notNullable();

            table.integer('class_id')
                .notNullable()
                .references('id')
                .inTable('classes')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
    },
    down: async knex => { return knex.schema.dropTable('class_schedule'); }
};
