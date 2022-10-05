const db = require('../db/connection');

exports.selectEvents = () => {
	return db.query('SELECT * FROM events').then((events) => {
		return events.rows;
	});
};

exports.insertEvent = (eventInfo) => {
	const { author, title, description, date, time } = eventInfo;
	if (!author || !title || !date || !time) {
		return Promise.reject({ status: 400, msg: 'information missing' });
	} else {
		return db
			.query(
				'INSERT into events (author, title, description, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
				[author, title, description, date, time]
			)
			.then((event) => {
				return event.rows;
			});
	}
};
