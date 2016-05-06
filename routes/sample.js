import express from 'express';
let router = express.Router();

import * as sampleController from '../controllers/sampleController';

router.get('/', sampleController.getAll);
router.post('/', sampleController.insert);

export default router;