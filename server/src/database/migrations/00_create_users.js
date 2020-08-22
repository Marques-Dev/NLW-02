module.exports = {
    up: async knex => {
        return knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('avatar').notNullable();
            table.string('whatsapp').notNullable();
            table.string('description').notNullable();
        });
    },
    down: async knex => { return knex.schema.dropTable('users'); }
};
