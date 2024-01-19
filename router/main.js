const express = require('express');
const router = express.Router();
const {signup,signin} = require('../controller/user');
const {home,filter} = require('../controller/logs')
const authenticateToken = require('../middleware/jwtVerify');

router.post('/user/signin',signin);
router.post('/user/signup',signup);

router.get('/home/:startIndex',authenticateToken,home)
router.post('/home/filter',authenticateToken,filter)

module.exports = router;