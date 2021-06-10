const { Router } = require('express');
const { UserController } = require('../controllers');

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

module.exports = router;
