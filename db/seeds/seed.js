const format = require('pg-format');
const db = require('../connection.js');

const { dropTables, createTables } = require('../helpers/manage-tables.js');

const seed = async ({ userData, eventsData }) => {
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

	await usersPromise;

	const insertEventsQueryStr = format(
		'INSERT INTO events (author, description, title, date, time) VALUES %L RETURNING *;',
		eventsData.map(({ author, description, title, date, time }) => [
			author,
			description,
			title,
			date,
			time,
		])
	);

	const eventsPromise = db
		.query(insertEventsQueryStr)
		.then((results) => results.rows);

	await eventsPromise;
};

module.exports = seed;
