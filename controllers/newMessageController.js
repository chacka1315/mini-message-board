import db from '../db/queries.js';
import { body, matchedData, validationResult } from 'express-validator';

function handleGET(req, res) {
  res.locals.title = 'New meaage';
  res.render('pages/form', { message: {} });
}

const lengthErr = 'Username must be at least 2 characters!';
const alphaNumErr = 'Name can only contain letters!';
const textErr = 'Your message cannot remain empty!';

const validationChain = [
  body('user_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage(lengthErr)
    .isAlpha('fr-FR', { ignore: ' ' })
    .withMessage(alphaNumErr),
  body('user_message').trim().isLength({ min: 1 }).withMessage(textErr),
];

const handlePOST = [
  validationChain,
  async (req, res) => {
    const validationErr = validationResult(req);

    if (!validationErr.isEmpty()) {
      const errors = validationErr.array();
      const { user_name, user_message } = req.body;
      return res.render('pages/form', {
        message: { user_name, user_message },
        errors: errors,
      });
    }

    const { user_name, user_message } = matchedData(req);
    const data = {
      username: user_name,
      text: user_message,
    };

    await db.addMessage(data);
    res.redirect('/');
  },
];

export default { get: handleGET, post: handlePOST };
