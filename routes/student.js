import express from 'express';
let router = express.Router();

router.get('/', (req, res, next) => {
    res.send([{
        _id: '12345',
        name: 'Peter Bernard',
        tags: ['AB-3L', 'male', 'pogi']
    }]);   
});

router.get('/:id', (req, res, next) => {
    res.send({
        _id: '12345',
        name: 'Peter Bernard',
        tags: ['AB-3L', 'male', 'pogi']
    });   
});

export default router;
