module.exports = {
    up: async knex => {
        return knex.schema.createTable('classes', table => {
            table.increments('id').primary();
            table.string('matter').notNullable();
            table.decimal('price').notNullable();

            table.integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
    },
    down: async knex => { return knex.schema.dropTable('classes'); }
};
