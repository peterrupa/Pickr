import express from 'express';
let router = express.Router();

import * as studentController from '../controllers/studentController';

import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' });

router.get('/:id/student', studentController.getAll);
router.post('/:id/student', upload.single('image'), studentController.insert);
router.get('/:id/student/:studentId', studentController.getOne);
router.post('/:id/student/studentId', studentController.update);
router.delete('/:id/student/studentId', studentController.remove);

export default router;