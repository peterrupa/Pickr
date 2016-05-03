import express from 'express';
let router = express.Router();
import * as accountController from '../controllers/accountController';

router.get('/whoami', accountController.whoami);
router.post('/createAccount', accountController.insert);
router.post('/login', accountController.login);
router.post('/logout', accountController.logout);

export default router;
