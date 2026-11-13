const express = require('express');
const router = express.Router();
const user = require('../controllers/users');
const { validateUser } = require('../middleware');

router.route('/register')
  .get(user.registerForm)
  .post(validateUser, user.register);

router.route('/login')
  .get(user.loginForm)
  .post(validateUser, user.login);

router.post('/logout', user.logout);

module.exports = router;


