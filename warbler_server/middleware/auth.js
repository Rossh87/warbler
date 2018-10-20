require('dotenv').load();

const jwt = require('jsonwebtoken');

exports.requireLogin = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
			if(err) {
				throw (err);
			}
			else if (payload) {return next()}
		});
	} 

	catch (err) {
		if (err.name === 'TokenExpiredError'){
			return next({
				status: 401,
				message: "Session Expired--Please Sign In!",
				signInRequired: true
			});
		} else {
			console.log('from requireLogin')
			return next({
				status: 401,
				message: "Please Sign In To Continue!",
				signInRequired: true
			})
		}
	}
}

exports.ensureCorrectUser = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
			if(payload && payload.id === req.params.id) {
				return next();
			} else {
				return next({
					status: 401,
					message: "Unauthorized Request"
				})
			}
		});
	}
		
	catch(err) {
		console.log('from ensure')
		return next({
			status: 401,
			message: "Authorization Failed"
		});
	}
}