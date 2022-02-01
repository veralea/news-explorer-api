const express = require('express');

const router = express.Router();

const { getProfile } = require('../controllers/users');

router.get('/me', getProfile);

// router.use(errors());

module.exports = router;
