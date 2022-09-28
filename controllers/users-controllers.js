const { selectUsers, insertUser } = require('../models/users-models');

exports.getUsers = (req, res, next) => {
	selectUsers()
		.then((result) => {
			res.status(200).send({ users: result });
		})
		.catch(next);
};

exports.postUser = (req, res, next) => {
	const userInfo = req.body;
	insertUser(userInfo).then((newUser) => res.send({ newUser }));
};
