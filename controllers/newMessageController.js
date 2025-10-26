import db from '../db.js';
function handleGET(req, res) {
  res.locals.title = 'New meaage';
  res.render('pages/form');
}

function handlePOST(req, res) {
  const { user_name, user_message } = req.body;
  const data = {
    user: user_name,
    text: user_message,
    added: getDate(),
    id: crypto.randomUUID(),
  };
  db.addMessage(data);
  res.redirect('/');
}

function getDate() {
  const date = new Date().toISOString().split('T');
  const day = date[0];
  let time = date[1].split('.')[0];
  time = time.slice(0, 5);
  const result = `${day} ${time}`;
  return result;
}
export default { get: handleGET, post: handlePOST };
