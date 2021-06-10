const { Router } = require('express');
const { ConsultationController } = require('../controllers');

const router = Router();

router.get('/', ConsultationController.getAll);
router.post('/', ConsultationController.createOne);

module.exports = router;
