import knex from 'knex';

export default knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'locogram'
    }
});
