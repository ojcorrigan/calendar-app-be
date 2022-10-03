const userRouter = require('express').Router();
const {
	getUsers,
	postUser,
	patchUser,
	deleteUser,
} = require('../controllers/users-controllers');

userRouter
	.get('/', getUsers)
	.post('/', postUser)
	.patch('/:username', patchUser)
	.delete('/:username', deleteUser);

module.exports = userRouter;
