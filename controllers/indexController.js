const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

export function indexController(req, res) {
  res.locals.title = 'Home';
  res.render('pages/index', { messages });
}
