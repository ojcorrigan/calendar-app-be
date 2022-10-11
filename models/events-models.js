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
				return event.rows[0];
			});
	}
};

exports.updateEvent = (eventInfo, event_id) => {
	const { description, author } = eventInfo;
	if (!description) {
		return Promise.reject({ status: 400, msg: 'information missing' });
	} else {
		return db
			.query(
				'UPDATE events SET description = $1 WHERE event_id = $2 and author = $3 RETURNING *',
				[description, event_id, author]
			)
			.then((event) => {
				if (!event.rows[0]) {
					return Promise.reject({ status: 404, msg: 'event not found' });
				} else return event.rows[0];
			});
	}
};

exports.deleteEvent = (event_id) => {
	return db
		.query('DELETE FROM events WHERE event_id = $1 RETURNING *', [event_id])
		.then((event) => {
			if (!event.rows[0]) {
				return Promise.reject({ status: 404, msg: 'event not found' });
			} else return event.rows;
		});
};
