const format = require('pg-format');
const db = require('../connection.js');

const { dropTables, createTables } = require('../helpers/manage-tables.js');

const seed = async ({ userData }) => {
	await dropTables();
	await createTables();

	const insertUsersQueryStr = format(
		'INSERT INTO users ( username, name, password) VALUES %L RETURNING *;',
		userData.map(({ username, name, avatar_url }) => [
			username,
			name,
			avatar_url,
		])
	);
	const usersPromise = db
		.query(insertUsersQueryStr)
		.then((result) => result.rows);

	await Promise.all([usersPromise]);
};

// const seed = () => {
// 	return db.query(`DROP TABLE IF EXISTS users cascade;`).then(() => {
// 		return db.query(
// 			`CREATE TABLE users (
//           username VARCHAR PRIMARY KEY,
//           name VARCHAR NOT NULL,
//           password VARCHAR NOT NULL
//         );`
// 		);
// 	});
// };

module.exports = seed;
