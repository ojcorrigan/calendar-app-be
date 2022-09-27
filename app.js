const express = require('express');
const app = express();
const cors = require('cors');

const apiRouter = require('./routes/api-router');

app.use(cors());

app.use('/api', apiRouter);

module.exports = app;
