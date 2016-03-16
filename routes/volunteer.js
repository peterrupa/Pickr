import express from 'express';
let router = express.Router();
import * as volunteerController from '../controllers/volunteerController';

router.post('/', volunteerController.insert);

export default router;