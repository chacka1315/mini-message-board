import pool from './pool.js';

async function formatDate(rows) {
  const result = await rows.map((row) => {
    const date = new Date(row.added).toLocaleString();
    return { ...row, added: date };
  });
  return result;
}

async function getAllmessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  const data = await formatDate(rows);
  return data;
}

async function getMessage(messageId) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    messageId,
  ]);
  const data = await formatDate(rows);
  return data[0];
}

async function addMessage(message) {
  const query = `INSERT INTO messages (text, added, username) VALUES ($1, $2, $3)`;
  const values = [message.text, message.added, message.username];
  await pool.query(query, values);
}

export default { getAllmessages, addMessage, getMessage };
