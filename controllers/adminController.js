// Dependencies
// =============================================================
// Requiring Express
var express = require('express');
// Requiring Models
var db = require("../models");
var router = express.Router();

router.get("/", function(req,res){
  res.render('admin')
});

// Routes
// =============================================================
// User Routes
router.get("/users", function(req, res) {
  db.User.findAll({}).then(function(dbUser) {
    res.json(dbUser);
  });
});
router.post("/create/user", function(req, res) {
  db.User.create(req.body).then(function(dbUser) {
    res.redirect("/");
  });
});
router.get("/user/search/:username", function(req,res){
  db.User.findOne({
    where: {
      username: req.params.username
    },
  }).then(function(data){
    res.json(data);
  });
})
router.delete("/user/:id", function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

router.put("/modifyuser", function(req, res) {
  console.log(req.body);
  db.User.update({
    password: req.body.password_hash,
    img_url: req.body.img_url
    },{
      where: {
        username: req.body.username
      },
    }).then(function(dbUser) {
      res.json(dbUser);
    });

});
// Category Routes
router.get("/categories", function(req, res) {
  db.Category.findAll({}).then(function(dbCategory) {
    res.json(dbCategory);
  });
});
router.post("/create/category", function(req, res) {
  db.Category.create(req.body).then(function(dbCategory) {
    res.redirect("/");
  });
});
router.get("/category/search/:categoryname", function(req,res){
  db.Category.findOne({
    where: {
      categoryname: req.params.categoryname
    },
  }).then(function(data){
    res.json(data);
  });
});
router.put("/modifycategory", function(req, res) {
  console.log(req.body);
  db.Category.update({
    description: req.body.description,
    img_url: req.body.img_url
    },{
      where: {
        categoryname: req.body.name
      },
    }).then(function(dbUser) {
      res.json(dbUser);
    });

});
// Quiz Routes
router.post("/create/quiz", function(req, res) {
  db.User.create(req.body).then(function(dbUser) {
    res.redirect("/");
  });
});
module.exports = router;
