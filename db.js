const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: '2025-10-26 01:05',
    id: '1',
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: '2025-10-26 01:05',
    id: '2',
  },
];

async function getAllmessages() {
  return messages;
}

async function addMessage(message) {
  messages.push(message);
}

async function getMessage(messageId) {
  const message = messages.find((message) => message.id === messageId);
  return message;
}
export default { getAllmessages, addMessage, getMessage };
