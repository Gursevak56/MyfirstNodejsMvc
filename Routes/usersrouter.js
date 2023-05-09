const express = require('express');
const router = express.Router();
const usercontroller = require('./../Controller/userController');

//routes
router.route('/signup').post(usercontroller.signup);
module.exports = router;