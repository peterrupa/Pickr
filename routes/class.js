import express from 'express';
let router = express.Router();
import * as classController from '../controllers/classController';

router.get('/:AccountId/class', classController.getAll);
router.post('/:AccountId/class', classController.insert);
router.get('/class/:id', classController.getOne);
router.put('/class/:id', classController.update);
router.delete('/class/:id', classController.remove);

export default router;
