const userRouter = require('express').Router();
const {
	getUsers,
	getUserById,
	postUser,
	patchUser,
	deleteUser,
} = require('../controllers/users-controllers');

userRouter
	.get('/', getUsers)
	.get('/:username', getUserById)
	.post('/', postUser)
	.patch('/:username', patchUser)
	.delete('/:username', deleteUser);

module.exports = userRouter;
