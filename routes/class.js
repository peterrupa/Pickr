import express from 'express';
let router = express.Router();
import * as classController from '../controllers/classController';

router.get('/', classController.getAll);
router.post('/', classController.insert);
router.get('/:id', classController.getOne);
router.put('/:id', classController.update);
router.delete('/:id', classController.deleteClass);

export default router;
