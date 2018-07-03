const User = require('./ModelUser');
const Task = require('./ModelTask');

function create(request, response) {
  // Extract all the relevant data out from the request body and pass it to the appropriate model function to create the user
  User.create(request.body.name, request.body.email, request.body.password, (result) => {
    response.cookie('login', result);
    response.redirect('/');
  });
}

function getRegistrationForm(request, response) {
  response.render('NewUser');
}

function login(request, response) {
  User.authenticate(request.body.email, request.body.password, (result, id) => {
    if (result === true) {
      response.cookie('login', id);
      response.redirect('/');
    } else {
      response.redirect('/users/login');
    };
  });
}

function logout (request, response) {
  response.clearCookie('login');
  response.redirect('/');
}

module.exports = {
  create,
  getRegistrationForm,
  login,
  logout
}