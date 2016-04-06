import express from 'express';
let router = express.Router();
import * as studentController from '../controllers/studentController';

router.get('/:id/student', studentController.getAll);
router.post('/:id/student', studentController.insert);
router.get('/:id/student/:studentId', studentController.getOne);
router.put('/:id/student/:studentId', studentController.update);
router.delete('/:id/student/:studentId', studentController.remove);

export default router;
