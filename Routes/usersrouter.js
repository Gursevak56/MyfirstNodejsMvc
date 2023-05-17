const express = require('express');
const router = express.Router();
const usercontroller = require('./../Controller/userController');

//routes
router.route('/signup').post(usercontroller.signup);
router.route('/signin').post(usercontroller.signin)
module.exports = router;