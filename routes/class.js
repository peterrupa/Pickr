import express from 'express';
let router = express.Router();
import * as classController from '../controllers/classController';

router.get('/', classController.getAll);
router.get('/', classController.getOne);
router.post('/', classController.insert);
router.put('/', classController.update);
router.delete('/', classController.deleteClass);

export default router;