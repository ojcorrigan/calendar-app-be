const db = require('../connection');

const createTables = async () => {
	const usersTablePromise = db.query(`
  CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    password VARCHAR
  );`);

	await usersTablePromise;

	await db.query(`
  CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    author VARCHAR NOT NULL REFERENCES users(username),
    date VARCHAR NOT NULL,
    time VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);
};

const dropTables = async () => {
	await db.query(`DROP TABLE IF EXISTS events;`);
	await db.query(`DROP TABLE IF EXISTS users cascade;`);
};

module.exports = { createTables, dropTables };
