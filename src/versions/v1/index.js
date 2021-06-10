const { Router } = require('express');
const { consultation, user } = require('./routes');
const { auth } = require('../../middlewares');

const router = Router();

router.use('/consultation', auth, consultation);
router.use('/user', user);

module.exports = router;
