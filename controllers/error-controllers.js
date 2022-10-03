exports.customError = (err, req, res, next) => {
	if (err.msg && err.status) res.status(err.status).send({ msg: err.msg });
	else {
		next(err);
	}
};

exports.psqlErrors = (err, req, res, next) => {
	console.log(err);
	const errorCodes = ['23505'];
	if (errorCodes.includes(err.code)) {
		res.status(400).send({ msg: 'bad request' });
	}
};
