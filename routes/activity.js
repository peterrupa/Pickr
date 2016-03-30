import express from 'express';
let router = express.Router();
import * as activityController from '../controllers/activityController';

router.get('/', activityController.getAll);
router.get('/', activityController.getOne);
router.post('/', activityController.insert);
router.put('/', activityController.update);
router.delete('/', activityController.deleteActivity);

export default router;
