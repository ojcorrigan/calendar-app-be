const {
	selectUsers,
	insertUser,
	updateUser,
	removeUser,
} = require('../models/users-models');

exports.getUsers = (req, res, next) => {
	selectUsers().then((result) => {
		res.status(200).send({ users: result });
	});
};

exports.postUser = (req, res, next) => {
	const userInfo = req.body;
	insertUser(userInfo)
		.then((user) => res.status(201).send(user))
		.catch((err) => next(err));
};

exports.patchUser = (req, res, next) => {
	const userInfo = req.body;
	const { username } = req.params;

	updateUser(userInfo, username).then((user) => {
		res.status(202).send(user);
	});
};

exports.deleteUser = (req, res, next) => {
	const { username } = req.params;

	removeUser(username).then((user) => {
		res.status(204).send(user);
	});
};
