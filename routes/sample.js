var express = require('express');
var router = express.Router();
var sampleController = require('../controllers/sampleController');

router.get('/', sampleController.getAll);
router.post('/', sampleController.insert);

module.exports = router;
