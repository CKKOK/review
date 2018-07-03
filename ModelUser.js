// Database setup. In practice, different models may use different databases. For example, the user model may pull information from one database while another model, e.g. pokemons, may pull information from another database.
const db = require('./db');

// We require this module only in the user model because of authentication needs. Notice how the task model (check the other file) doesn't require this.
const sha256 = require('js-sha256');

// Model functions that my controllers might need. Notice how all database calls exist here and not in the controller. Control is passed back to the controller (sort of) by having the controller pass in a callback function, which the model functions then call (i.e. they call the callback functions) with the query results as parameters. Not ideal, yes, and it will get messy if you have nested queries from different models. For an example, see the one in index.js corresponding to the root route, which calls functions from both the task and user models.
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