function errorHandler(err, req, res, next) {
	return res.status(err.status || 500).json({
		error: err
	});
};

module.exports = errorHandler;