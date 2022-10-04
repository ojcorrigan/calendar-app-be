const db = require('../db/connection');

exports.selectEvents = () => {
	return db.query('SELECT * FROM events').then((events) => {
		return events.rows;
	});
};
