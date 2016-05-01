import express from 'express';
let router = express.Router();
import * as noteController from '../controllers/noteController';

router.post('/:ActivityId/note', noteController.insert);
router.delete('/note/:noteId', noteController.remove);
export default router;
