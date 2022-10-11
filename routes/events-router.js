const eventsRouter = require('express').Router();
const {
	getEvents,
	postEvent,
	patchEvent,
} = require('../controllers/events-controllers');

eventsRouter
	.get('/', getEvents)
	.post('/', postEvent)
	.patch('/:event_id', patchEvent);

module.exports = eventsRouter;
