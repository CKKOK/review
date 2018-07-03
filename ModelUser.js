// Database setup. In practice, different models may use different databases. For example, the user model may pull information from one database while another model, e.g. pokemons, may pull information from another database.
const db = require('./db');

const sha256 = require('js-sha256');

// Model
function find(id, callback) {
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    callback(result.rows[0]);
  })
}

function authenticate(email, password, callback) {
  db.query('SELECT id, password FROM users WHERE email = $1', [email], (error, result) => {
    if (sha256(password) === result.rows[0]['password']) {
      callback(true, result.rows[0]['id']);
    } else {
      callback(false, null);
    }
  })
}

function create(name, email, password, callback) {
  let queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
  let values = [name, email, sha256(password)];
  db.query(queryString, values, (error, result) => {
    callback(result.rows[0]['id']);
  })
};

module.exports = {
  find,
  create,
  authenticate
}