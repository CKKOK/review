const pg = require('pg');
const config = {
  user: 'kokcheekean',
  host: '127.0.0.1',
  database: 'tasklist',
  port: 5432,
};
const db = new pg.Pool(config);

module.exports = db;