import express from 'express';
let router = express.Router();
import * as activityController from '../controllers/activityController';

router.get('/:id/activity', activityController.getAll);
router.get('/activity/:activityId', activityController.getOne);
router.post('/:id/activity', activityController.insert);
router.put('/activity/:activityId', activityController.update);
router.delete('/activity/:activityId', activityController.remove);

export default router;
