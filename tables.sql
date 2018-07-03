CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  task TEXT
);

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE users_tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    task_id INTEGER
);
