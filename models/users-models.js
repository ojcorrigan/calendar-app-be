const db = require('../db/connection');

exports.selectUsers = () => {
	return db.query('SELECT * FROM users;').then((users) => {
		return users.rows;
	});
};

exports.selectUserById = (username) => {
	return db
		.query('SELECT * FROM users WHERE username = $1', [username])
		.then((user) => {
			return { user: user.rows[0] };
		});
};

exports.insertUser = (newUser) => {
	const { username, name, password } = newUser;

	if (!username || !name || !password) {
		return Promise.reject({ status: 400, msg: 'bad request' });
	} else {
		return db
			.query(
				'INSERT INTO users (username, name, password) VALUES ($1, $2, $3) RETURNING *',
				[username, name, password]
			)
			.then((result) => {
				return { user: result.rows[0] };
			});
	}
};

exports.updateUser = (userInfo, username) => {
	const { name } = userInfo;

	if (!name) {
		return Promise.reject({ status: 400, msg: 'bad request' });
	} else {
		return db
			.query('UPDATE users SET name = $1 WHERE username = $2 RETURNING *', [
				name,
				username,
			])
			.then((results) => {
				if (!results.rows[0]) {
					return Promise.reject({ status: 404, msg: 'user not found' });
				} else {
					return results.rows[0];
				}
			});
	}
};

exports.removeUser = (username) => {
	return db
		.query('DELETE FROM users WHERE username = $1 RETURNING *;', [username])
		.then((res) => {
			if (!res.rows[0]) {
				return Promise.reject({ status: 404, msg: 'event not found' });
			} else return res.rows;
		});
};
