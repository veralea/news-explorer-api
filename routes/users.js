const express = require('express');

const router = express.Router();

const { getProfile } = require('../controllers/users');

router.get('/me', getProfile);

module.exports = router;
