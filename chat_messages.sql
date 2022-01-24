DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO chat_messages
  (user_id, message) 
VALUES 
  (145, 'Hey everyone, nice to meet you...'),
  (101, 'Hello there!'),
  (106, 'I love this social network');