const express = require('express');
const app = express();
const cors = require('cors');

const apiRouter = require('./routes/api-router');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
