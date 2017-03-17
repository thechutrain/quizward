// Dependencies
// =============================================================
// Requiring Express
var express = require('express');
// Requiring Models
var db = require("../models");
var router = express.Router();

router.get("/", function(req,res){
  res.render('admin/admin')
});

// Routes
// =============================================================
// User Routes
router.get("/users", function(req, res) {
  db.User.findAll({
      attributes: { exclude: ['password_hash'] },
    }).then(function(user) {
    res.render('admin/allusers', {user: user});
  });
});
router.post("/create/user", function(req, res) {
  db.User.create(req.body).then(function(dbUser) {
    res.redirect("/admin");
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
});
router.delete("/deleteuser", function(req, res) {
  db.User.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(user) {
    res.json(user)
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
  db.Category.findAll({}).then(function(category) {
    res.render("admin/allcategories", {category: category});
  });
});
router.post("/create/category", function(req, res) {
  db.Category.create(req.body).then(function(dbCategory) {
    res.redirect("/admin");
  });
});
router.get("/category/search/:categoryname", function(req,res){
  db.Category.findOne({
    where: {
      name: req.params.categoryname
    },
  }).then(function(data){
    res.json(data);
  });
});
router.put("/modifycategory", function(req, res) {
  console.log(req.body);
  db.Category.update({
    description: req.body.description,
    image: req.body.image
    },{
      where: {
        name: req.body.name
      },
    }).then(function(dbUser) {
      res.json(dbUser);
    });

});

router.delete("/deletecategory", function(req, res) {
  db.Category.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(category) {
    res.redirect("/admin");
  });
});
// Quiz Routes
router.post("/create/quiz", function(req, res) {
  db.User.create(req.body).then(function(dbUser) {
    res.redirect("/");
  });
});
module.exports = router;
