import express from 'express';

let router = express.Router();

import * as studentController from '../controllers/studentController';

import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' });

router.get('/:id/student', studentController.getAll);
router.post('/:id/student', upload.single('image'), studentController.insert);
router.get('/student/:studentId', studentController.getOne);
router.put('/student/:studentId', upload.single('image'), studentController.update);
router.delete('/student/:studentId', studentController.remove);

export default router;

