const eventsRouter = require('express').Router();
const { getEvents, postEvent } = require('../controllers/events-controllers');

eventsRouter.get('/', getEvents).post('/', postEvent);

module.exports = eventsRouter;
