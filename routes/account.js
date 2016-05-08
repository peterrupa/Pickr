import express from 'express';
let router = express.Router();
import * as accountController from '../controllers/accountController';

router.post('/createAccount', accountController.insert);
router.post('/login', accountController.login);
router.get('/logout', accountController.logout);
router.put('/forgotPassword', accountController.forgotPassword);
router.put('/resetPassword', accountController.resetPassword);
router.put('/changePassword', accountController.changePassword);

export default router;
