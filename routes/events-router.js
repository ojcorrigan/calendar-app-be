const eventsRouter = require('express').Router();
const {
	getEvents,
	postEvent,
	patchEvent,
	removeEvent,
} = require('../controllers/events-controllers');

eventsRouter
	.get('/', getEvents)
	.post('/', postEvent)
	.patch('/:event_id', patchEvent)
	.delete('/:event_id', removeEvent);

module.exports = eventsRouter;
