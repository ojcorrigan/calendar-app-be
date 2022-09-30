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
			return { user: result.rows[0] };
		});
};

exports.updateUser = (userInfo, username) => {
	const { name } = userInfo;
	return db
		.query('UPDATE users SET name = $1 WHERE username = $2 RETURNING *', [
			name,
			username,
		])
		.then((results) => {
			return results.rows[0];
		});
};
