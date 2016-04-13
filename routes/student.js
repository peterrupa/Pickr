import express from 'express';
let router = express.Router();
import * as studentController from '../controllers/studentController';

router.get('/', studentController.getAll);
router.get('/:studentId', studentController.getOne);
router.post('/', studentController.insert);
router.put('/', studentController.update);
router.delete('/', studentController.deleteStudent);

export default router;