import pg from 'pg';

const client = new pg.Client(process.env.PGURL);
await client.connect();

export default client;
