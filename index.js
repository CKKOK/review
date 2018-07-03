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
app.get('/', (request, response) => {
  if (request.cookies['login']) {
    let id = request.cookies['login'];
    User.find(id, (result) => {
      response.render('home', {name: result['name']});
    });
  } else {
    response.render('home');
  }
});

app.listen(3000, () => {console.log('Server started')});
