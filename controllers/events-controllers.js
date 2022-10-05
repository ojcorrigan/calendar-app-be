const { selectEvents, insertEvent } = require('../models/events-models');

exports.getEvents = (req, res, next) => {
	selectEvents().then((events) => {
		res.status(200).send({ events });
	});
};

exports.postEvent = (req, res, next) => {
	const eventInfo = req.body;
	insertEvent(eventInfo)
		.then((event) => {
			res.status(200).send({ event });
		})
		.catch((err) => {
			next(err);
		});
};
