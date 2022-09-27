const apiRouter = require('express').Router();
const usersRouter = require('./users-router');
// const topicsRouter = require('./topics-router');

apiRouter.use('/users', usersRouter);

// apiRouter.use('/events', topicsRouter);

module.exports = apiRouter;
