import express from 'express';
let router = express.Router();
import * as volunteerController from '../controllers/volunteerController';

router.post('/', volunteerController.insert);
router.get('/class/:id', volunteerController.getAll);
router.get('/:id', volunteerController.getOne);
router.get('/:id/info',volunteerController.getStudentInfo);
router.get('/:id/activities',volunteerController.getVolunteerActivities);

export default router;
