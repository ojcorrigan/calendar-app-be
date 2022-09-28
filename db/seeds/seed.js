const format = require('pg-format');
const db = require('../connection.js');

const seed = () => {
	return db.query(`DROP TABLE IF EXISTS users cascade;`).then(() => {
		return db.query(
			`CREATE TABLE users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          password VARCHAR NOT NULL
        );`
		);
	});
};

module.exports = seed;
