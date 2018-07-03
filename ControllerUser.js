// Import only the models relevant to this route in order to keep things tidy. In a full blown app, there are usually other models here, e.g. the task model so that we can find the tasks associated with a particular user. For now, that's handled in index.js at the root route.
const User = require('./ModelUser');

function create(request, response) {
  // Extract all the relevant data out from the request body and pass it to the appropriate model function to create the user. Notice how there's no database querying here. That's left to the model functions. The controller's purpose here is to execute business logic and delegate the pulling of data to the relevant models. Some programmers elect to execute business logic in the models as well - whichever way keeps your code tidier and more readable is probably the right one!
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
      response.redirect('/');
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