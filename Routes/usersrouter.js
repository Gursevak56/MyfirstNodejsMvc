const express = require('express');
const router = express.Router();
const usercontroller = require('./../Controller/userController');

//routes
router.route('/signup').post(usercontroller.signup);
router.route('/signin').post(usercontroller.signin);
router.route('/forgetPassword').post(usercontroller.forgetPassword);
router.route('/restPassword/:token').post(usercontroller.resetPassword);
module.exports = router;