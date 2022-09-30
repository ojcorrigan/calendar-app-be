const userRouter = require('express').Router();
const {
	getUsers,
	postUser,
	patchUser,
} = require('../controllers/users-controllers');

userRouter
	.get('/', getUsers)
	.post('/', postUser)
	.patch('/:username', patchUser);

module.exports = userRouter;
