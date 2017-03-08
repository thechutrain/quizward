var express = require('express');
var Models = require('./models');

// Create app
var app = express();
var PORT = process.env.PORT || 3000;

// Routers

// Create Server
Models.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log(`Listening on PORT: ${PORT}`);
  });
});

