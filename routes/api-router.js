const apiRouter = require('express').Router();
const usersRouter = require('./users-router');
const eventsRouter = require('./events-router');

apiRouter.use('/users', usersRouter);

apiRouter.use('/events', eventsRouter);

// apiRouter.use('/events', topicsRouter);

module.exports = apiRouter;
