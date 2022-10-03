const express = require('express');
const app = express();
const cors = require('cors');

const { invalidPath } = require('./controllers/invalid-path-controller');

const { customError, psqlErrors } = require('./controllers/error-controllers');

const apiRouter = require('./routes/api-router');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', invalidPath);

app.use(customError);

app.use(psqlErrors);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
