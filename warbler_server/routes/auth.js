const express = require('express'),
	router = express.Router(),
	{ signup, signin, allowRefresh } = require('../handlers/auth')

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/refresh', allowRefresh);


module.exports = router;