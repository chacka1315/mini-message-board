import db from '../db.js';

export async function indexController(req, res) {
  res.locals.title = 'Home';
  const messages = await db.getAllmessages();
  res.render('pages/index', { messages });
}
