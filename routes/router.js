import express from 'express';
import newMessageController from '../controllers/newMessageController.js';
import { indexController } from '../controllers/indexController.js';
import messageController from '../controllers/messageController.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();

router.get('/', indexController);
router.get('/messages/:messageId', messageController.messageViewGet);
router.post('/messages/delete/:messageId', messageController.messageDeletePost);
router.get('/new', newMessageController.get);
router.post('/new', newMessageController.post);
router.use((req, res) => {
  throw new NotFoundError('This Page does not exist!');
});
export default router;
