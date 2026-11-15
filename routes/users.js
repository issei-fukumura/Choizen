const express = require('express');
const router = express.Router();
const user = require('../controllers/users');
const { validateRegister, validateLogin, validateUsername, isLoggedIn } = require('../middleware');

router.route('/register')
  .get(user.registerForm)
  .post(validateRegister, user.register);

router.route('/login')
  .get(user.loginForm)
  .post(validateLogin, user.login);

router.route('/username')
  .get(isLoggedIn, user.usernameForm)
  .post(isLoggedIn, validateUsername, user.setUsername);  

router.post('/logout', user.logout);

module.exports = router;


