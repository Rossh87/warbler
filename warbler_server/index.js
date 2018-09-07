require("dotenv").config();

const express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	errorHandler = require('./handlers/error'),
	authRoutes = require('./routes/auth'),
	messageRoutes = require('./routes/messages'),
	{requireLogin, ensureCorrectUser } = require('./middleware/auth'),
	db = require('./models')

const PORT = 8081;

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);

app.use('/api/users/:id/messages',
	requireLogin,
	ensureCorrectUser, 
	messageRoutes
);

app.get('/api/messages', requireLogin, async function (req, res, next) {
	try {
		let allMessages = await
		db.Message.find()
		.sort({createdAt: 'desc'})
		.populate('user', {
			username: true,
			profileImageUrl: true
		});
		return allMessages ? 
			res.status(200).json(allMessages)
			: res.status(200).json({})
	} 

	catch(err) {
		return next(err);
	}
});

// error handler
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

// start server
app.listen(PORT, function() {
	console.log(`server starting on ${PORT}`);
})
