// Database setup. In practice, different models may use different databases. For example, the user model may pull information from one database while another model, e.g. pokemons, may pull information from another database.
const db = require('./db');

function create(task, callback) {
    let queryString = 'INSERT INTO tasks (task) VALUES ($1) RETURNING id';
    let values = [task];
    db.query(queryString, values, (error, result) => {
      callback(result.rows[0]['id']);
    });
};

function assignToUser(task_id, user_id, callback) {
    let queryString = 'INSERT INTO users_tasks (user_id, task_id) VALUES ($1, $2) RETURNING id';
    let values = [user_id, task_id];
    db.query(queryString, values, (error, result) => {
        callback(result.rows[0]['id']);
    });
};

function getAllTasksOfUser(user_id, callback) {
    let queryString = 'SELECT task FROM users INNER JOIN users_tasks ON users.id = users_tasks.user_id INNER JOIN tasks ON tasks.id = users_tasks.task_id WHERE users_tasks.user_id = ' + user_id;
    db.query(queryString, (error, result) => {
        callback(result.rows);
    });
};


module.exports = {
    create,
    assignToUser,
    getAllTasksOfUser
}