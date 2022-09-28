const db = require('../db/connection');

exports.selectUsers = () => {
	return db.query('SELECT * FROM users;').then((users) => {
		return users.rows;
	});
};

exports.postUser = (newUser) => {
	const { username, given_name, pass_word } = newUser;

	return db
		.query(
			'INSERT INTO users (username, given_name, pass_word) VALUES ($1, $2, $3) RETURNING *;',
			[username, given_name, pass_word]
		)
		.then(({ users }) => users[0]);
};
