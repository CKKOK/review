const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');

const config = {
  user: '',
  host: '127.0.0.1',
  database: 'tasklist',
  port: 5432,
};

const db = new pg.Pool(config);

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

function getRoot(request, response) {
	response.render('home');
}

function getNewUserForm(request, response) {
  response.render('newuser');
}

function createNewUser(request, response) {
  response.redirect('/');
}

function login(request, response) {
  response.redirect('/');
}

app.get('/new', getNewUserForm);
app.post('/new', createNewUser);
app.post('/login', login);
app.get('/', getRoot);

app.listen(3000, function(){console.log('Server started')});