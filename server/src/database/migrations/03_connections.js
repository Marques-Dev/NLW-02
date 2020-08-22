module.exports = {
    up: async knex => {
        return knex.schema.createTable('connections', table => {
            table.increments('id').primary();

            table.integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.timestamp('created_at')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
                .notNullable();
        });
    },
    down: async knex => { return knex.schema.dropTable('connections'); }
};
