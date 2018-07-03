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

// The tasks-users relation is a many-to-many one. A task can belong to many user (hey, group work), and a user of course can have many tasks. This is an example of how to retrieve all items belonging to a particular user in such a relation, using SQL inner joins and a join table. We are selecting all tasks, not from the users table but from the join of the users table with the users_tasks table where the id of the users table must match with the user_id of the users_tasks table, AND the join of the tasks table where the id of the tasks table must match the task_id of the users_tasks table, and that the user_id is equal to the user_id being passed into the function.
// user_id from function = user id <-> users_tasks.user_id and users_tasks.task_id <-> task id, then tet task name
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