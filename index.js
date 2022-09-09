require('dotenv').config();

const PORT = process.env.PORT;

require('./db');

const path = require('path');
const express = require('express');
const session = require('express-session');
const routesApi = require('./routes/api');
const routesWeb = require('./routes/web');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
  secret: 'engfmslçelfwç',
  expires: new Date(Date.now() + 3600)
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'static')));

app.use((req, res, next) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

app.use((req, res, next) => {
  if (req.path == '/web/login') {
    return next()
  }

  if (req.session.auth && req.session.auth.isLoggedIn) {
    return next();
  }

  res.redirect('/web/login');
});

app.use(routesApi);
app.use(routesWeb);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
