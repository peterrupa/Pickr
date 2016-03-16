import express from 'express';
let router = express.Router();

import * as userController from '../controllers/userController';

router.post('/api/login', userController.login);
router.get('/api/logout', userController.logout);

export default router;
