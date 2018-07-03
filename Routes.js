const user = require('./ControllerUser');

function setupRoutes(app) {
  app.get('/users/register', user.getRegistrationForm);
  app.post('/users/new', user.create);
  app.post('/users/login', user.login);
  app.get('/users/logout', user.logout);
};

module.exports = setupRoutes;