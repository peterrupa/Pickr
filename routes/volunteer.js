import express from 'express';
let router = express.Router();
import * as volunteerController from '../controllers/volunteerController';

router.post('/', volunteerController.insert);
router.get('/:id', volunteerController.getOne);
router.get('/available/:classCode', volunteerController.getAvailableVolunteers);

export default router;