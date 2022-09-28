const userRouter = require('express').Router();
const { getUsers, postUser } = require('../controllers/users-controllers');

userRouter.get('/', getUsers).post('/', postUser);

module.exports = userRouter;
