import express from 'express';
let router = express.Router();

import * as studentController from '../controllers/studentController';

router.get('/', studentController.getAll);
router.post('/', studentController.insert);
router.get('/:id', studentController.getOne);
router.post('/:id', studentController.update);
router.delete('/:id', studentController.remove);

export default router;
