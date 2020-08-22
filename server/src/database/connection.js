const Knex = require('knex');
const { resolve } = require('path');

const db = Knex({
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
});

module.exports = { db };
