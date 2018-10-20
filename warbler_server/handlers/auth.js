const db = require('../models'),
	jwt = require('jsonwebtoken')

exports.signup = async function(req, res, next) {
	try {
		let user = await db.User.create(req.body);
		let {id, username, profileImageUrl} = user;
		let token = jwt.sign(
			{
				id,
				username,
				profileImageUrl
			}, process.env.SECRET_KEY,
			{expiresIn: '10m'}
		);
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	}

	catch (err) {
		if(err.code === 11000) {
			err.message = "Sorry, that username and/or email is taken!";
		}

		return next({
			status: 400,
			message: err.message
		});
	}
};

exports.signin = async function(req, res, next) {
	try {
		let user = await db.User.findOne({email: req.body.email});
		let {id, username, profileImageUrl} = user;
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					id,
					username,
					profileImageUrl
				}, 
				process.env.SECRET_KEY,
				{expiresIn: '2m'}
			);
	
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			})
		} else {
			return next({
				status: 400,
				message: "Invalid Email or Password"
			})
		}
	}

	catch (err) {
		return next({
			status: 400,
			message: "Invalid Email or Password"
		})
	}
};

exports.allowRefresh = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
			if(err) {
				throw (err);
			}
			else if (payload) {
				const {id, username, profileImageUrl} = payload;
				let newToken = jwt.sign(
					{
						id,
						username, 
						profileImageUrl
					},
					process.env.SECRET_KEY,
					{expiresIn: '5m'}
				);

				return res.status(200).json({token: newToken});
			}
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
			return next({
				status: 401,
				message: "Please Sign In To Continue!",
				signInRequired: true
			})
		}
	}
}