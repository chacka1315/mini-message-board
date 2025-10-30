import 'dotenv/config';
import { Client } from 'pg';

const createMsgTabQuery = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text TEXT,
  added TIMESTAMP DEFAULT NOW(),
  username VARCHAR(255)
);
`;

const initialFillQuery = `
INSERT INTO messages (text, username)
VALUES
  ('Hi there, Thunderr⚡!', 'Thor'),
  ('Hello, I''m Odin from Scandinavia🤴', 'Odin'),
  ('Hey I''m Freya!', 'Freya'),
  ('Hello World! 🪬', 'Fatma');
`;

async function main() {
  const connectionString = process.argv[2];
  console.log('Connecting str: ', connectionString);
  const client = new Client({
    connectionString,
  });
  try {
    console.log('🚀 Sending...');
    await client.connect();
    await client.query(createMsgTabQuery);
    await client.query(initialFillQuery);
    console.log('✅ Done!');
  } catch (error) {
    console.log('❌ Error!');
    throw error;
  } finally {
    await client.end();
  }
}

main();
