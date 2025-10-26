import db from '../db.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function messageController(req, res) {
  res.locals.title = 'Messages';
  const { messageId } = req.params;
  const messages = await db.getAllmessages();
  const message = await db.getMessage(messageId);

  if (!message) {
    const error = new NotFoundError('This message does not exist!');
    console.log(error);
    res.status(error.statusCode).render('pages/message', { messages, message });
    return;
  }

  res.render('pages/message', { messages, message });
}
