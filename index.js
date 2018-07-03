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

// Trigger the setting up of routes for this particular express server. We have to call the function here immediately and pass our express server into it. This is because this index.js file is the only file that nodejs will run when we do node index.js. Leaving the routes defined in Routes.js without calling them explicitly here will result in the routes never being set up because Routes.js is never called otherwise!
require('./Routes')(app);

// Handle the root route
const User = require('./ModelUser');
const Task = require('./ModelTask');
app.get('/', (request, response) => {
  // If the user is logged in, find all tasks associated with the user...
  if (request.cookies['login']) {
    let id = request.cookies['login'];
    Task.getAllTasksOfUser(id, (tasks) => { // This is the callback function that is being passed into the .getAllTasksOfUser method
      // ... then find the user's name...
      User.find(id, (result) => { // This is the callback function that is being passed into the .find method. Notice that callbacks can have callbacks inside them too!
        // ... then render the home page with the user's name and tasks.
        response.render('Home', {name: result['name'], tasks: tasks});
      });
    });
  } else {
    // Otherwise just render the home page. In this case, without any name or tasks data, the .jsx view will not render certain items on the page
    response.render('Home');
  }
});

app.listen(3000, () => {console.log('Server started')});
