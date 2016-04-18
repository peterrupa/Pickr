import express from 'express';
let router = express.Router();

import * as studentController from '../controllers/studentController';

router.get('/:id/student', studentController.getAll);
router.post('/:id/student', studentController.insert);
router.get('/student/:studentId', studentController.getOne);
router.put('/student/:studentId', studentController.update);
router.delete('/student/:studentId', studentController.remove);
export default router;
