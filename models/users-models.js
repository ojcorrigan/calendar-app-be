const db = require('../db/connection');

exports.selectUsers = () => {
	return db.query('SELECT * FROM users;').then((users) => {
		return users.rows;
	});
};

exports.insertUser = (newUser) => {
	const { username, name, password } = newUser;

	return db
		.query(
			'INSERT INTO users (username, name, password) VALUES ($1, $2, $3) RETURNING *',
			[username, name, password]
		)
		.then((result) => {
			console.log(result.rows);
			return { user: result.rows[0] };
		});
};
