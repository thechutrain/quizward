var express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
var exphbs = require('express-handlebars');

// lib
var Models = require('./models');
var defaultController = require('./controllers/defaultController.js');
var quizController = require('./controllers/quizController.js');
var categoryController = require('./controllers/categoryController.js');


// Create app
var app = express();
var PORT = process.env.PORT || 3000;

// Set up view w. Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(session({
  secret: 'app',
  cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 },
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Routers
app.use('/', defaultController);
app.use('/quizzes', quizController);
app.use('/categories', categoryController);

// Create Server
Models.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`);
  });
});