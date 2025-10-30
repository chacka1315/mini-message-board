import db from '../db/queries.js';

function handleGET(req, res) {
  res.locals.title = 'New meaage';
  res.render('pages/form');
}

function handlePOST(req, res) {
  const { user_name, user_message } = req.body;
  const data = {
    username: user_name,
    text: user_message,
  };

  db.addMessage(data);
  res.redirect('/');
}

export default { get: handleGET, post: handlePOST };
