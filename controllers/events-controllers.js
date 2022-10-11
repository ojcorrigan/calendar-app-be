const {
	selectEvents,
	insertEvent,
	updateEvent,
	deleteEvent,
} = require('../models/events-models');

exports.getEvents = (req, res, next) => {
	selectEvents().then((events) => {
		res.status(200).send({ events });
	});
};

exports.postEvent = (req, res, next) => {
	const eventInfo = req.body;
	insertEvent(eventInfo)
		.then((event) => {
			res.status(201).send({ event });
		})
		.catch((err) => {
			next(err);
		});
};

exports.patchEvent = (req, res, next) => {
	const { event_id } = req.params;
	const eventInfo = req.body;

	updateEvent(eventInfo, event_id)
		.then((event) => {
			res.status(200).send({ event });
		})
		.catch((err) => {
			next(err);
		});
};

exports.removeEvent = (req, res, next) => {
	const { event_id } = req.params;

	deleteEvent(event_id)
		.then((event) => {
			res.status(204).send(event);
		})
		.catch((err) => {
			next(err);
		});
};
