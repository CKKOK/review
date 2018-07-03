const db = require('./db');
const sha256 = require('js-sha256');

async function initDb() {
  await db.query('DROP TABLE IF EXISTS users');
  await db.query('DROP TABLE IF EXISTS tasks');
  await db.query('DROP TABLE IF EXISTS users_tasks');
  await db.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
  await db.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, task TEXT)');
  await db.query('CREATE TABLE IF NOT EXISTS users_tasks (id SERIAL PRIMARY KEY, user_id INTEGER, task_id INTEGER)');
  let queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
  let insertions = [
    ['Tall', 'abc@abc.com', sha256('1234')],
    ['Grande', 'xyz@xyz.com', sha256('1234')],
    ['Venti', '123@123.com', sha256('1234')]
  ];

  for (let i = 0; i < insertions.length; i++) {
    await db.query(queryString, insertions[i]);
  };

  queryString = 'INSERT INTO tasks (task) VALUES ($1)';
  insertions = [
    ['Wake up'],
    ['Dance'],
    ['Sleep'],
    ['Eat'],
    ['Drink']
  ];

  for (let i = 0; i < insertions.length; i++) {
    await db.query(queryString, insertions[i]);
  };

  queryString = 'INSERT INTO users_tasks (user_id, task_id) VALUES ($1, $2)';
  insertions = [
    [1, 1],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 2],
    [3, 4],
    [3, 1]
  ]

  for (let i = 0; i < insertions.length; i++) {
    await db.query(queryString, insertions[i]);
  };
};

initDb();