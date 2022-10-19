const express = require('express');
const path = require('path');
const morgan = require('morgan');
const clucks_route = require('./routes/clucks');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use((req, res, next) => {
  const username = req.cookies.username;

  res.locals.username = '';

  if (username) {
    res.locals.username = username;
    console.log(`Signed in as ${username}`);
  }
  next();
});

/* Require Path for static assets */
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hi beautiful you! 👾');
});

const PORT = 3030;
const LOCALHOST = 'localhost';

/* Router File */
app.use('/clucks', clucks_route);

app.get('/sign_in', (req, res) => {
  res.render('clucks/signIn');
});
//------Sign in POST request---------------->
app.post('/sign_in', (req, res) => {
  // res.send(req.body) //-> this is available through urlencoded

  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; //a day in milliseconds
  const username = req.body.username;
  res.cookie('username', username, { maxAge: COOKIE_MAX_AGE });
  res.redirect('/clucks');
});

//-------Sign out POST request------------->
app.post('/sign_out', (req, res) => {
  res.clearCookie('username');
  res.redirect('/clucks');
});

app.listen(PORT, LOCALHOST, (err) => {
  if (err) {
    console.log(`Error`, err);
  } else {
    console.log(`Listening on ${PORT}:${LOCALHOST}`);
  }
});
