import db from '../db/queries.js';
import NotFoundError from '../errors/NotFoundError.js';

async function messageViewGet(req, res) {
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

async function messageDeletePost(req, res) {
  const { messageId } = req.params;

  if (messageId) {
    await db.deleteMessage(messageId);
  }

  res.redirect('/');
}

export default { messageDeletePost, messageViewGet };
