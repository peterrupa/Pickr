import express from 'express';
let router = express.Router();
import * as accountController from '../controllers/accountController';

router.post('/createAccount', accountController.insert);
router.post('/login', accountController.login);
router.get ('/logout', accountController.logout);

export default router;
