const {
	selectUsers,
	insertUser,
	updateUser,
} = require('../models/users-models');

exports.getUsers = (req, res, next) => {
	selectUsers()
		.then((result) => {
			res.status(200).send({ users: result });
		})
		.catch(next);
};

exports.postUser = (req, res, next) => {
	const userInfo = req.body;
	insertUser(userInfo).then((user) => res.status(201).send(user));
};

exports.patchUser = (req, res, next) => {
	const userInfo = req.body;
	const { username } = req.params;

	updateUser(userInfo, username).then((user) => {
		res.status(202).send(user);
	});
};
