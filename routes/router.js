import express from 'express';
import { newMsgController } from '../controllers/newMessageController.js';
import { indexController } from '../controllers/indexController.js';

const router = express.Router();

router.get('/', indexController);
router.get('/new', newMsgController);

export default router;
