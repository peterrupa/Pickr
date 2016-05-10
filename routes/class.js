import express from 'express';
let router = express.Router();
import * as classController from '../controllers/classController';
import classAuth from '../tools/classAuth';
 
router.get('/class/fetchAll', classController.getAll);
router.get('/class/getClass/session', classController.getClassBySessionId);
router.post('/class/setAID', classController.setActivityID);
router.post('/class/setCID', classController.setClassID);
router.post('/class/addClass', classController.insert);
router.get('/class/:id', classController.getOne);
router.put('/class/:id', classController.update);
router.delete('/class/:id', classController.remove);

export default router;
