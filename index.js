const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Trigger the setting up of routes for this particular express server
require('./Routes')(app);

// Handle the root route
const User = require('./ModelUser');
const Task = require('./ModelTask');
app.get('/', (request, response) => {
  if (request.cookies['login']) {
    let id = request.cookies['login'];
    Task.getAllTasksOfUser(id, (tasks) => {
      User.find(id, (result) => {
        response.render('Home', {name: result['name'], tasks: tasks});
      });
    });
  } else {
    response.render('Home');
  }
});

app.listen(3000, () => {console.log('Server started')});
