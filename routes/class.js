import express from 'express';
let router = express.Router();
import * as classController from '../controllers/classController';

router.get('/', classController.getAll);
router.get('/:id', classController.getOne);
router.post('/', classController.insert);
router.put('/:id', classController.update);
router.delete('/:id', classController.remove);

export default router;
