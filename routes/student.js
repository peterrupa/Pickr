var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send([{
        _id: '12345',
        name: 'Peter Bernard',
        tags: ['AB-3L', 'male', 'pogi']
    }]);   
});

router.get('/:id', function(req, res, next) {
    res.send({
        _id: '12345',
        name: 'Peter Bernard',
        tags: ['AB-3L', 'male', 'pogi']
    });   
});

module.exports = router;
