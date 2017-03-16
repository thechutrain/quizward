var express = require('express');
var Models = require('../Models');
var multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/assets/images/uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })
  // var maxSize = 1 * 1000 * 1000;
  // limits: { fileSize: maxSize }
var upload = multer({ storage: storage })

// router.use(multer({ dest: './public/uploads/' }));

// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/', function(req, res) {
  Models.Category.findAll({}).then((results) => {
    var categories = {
      categories: results
    };
    res.render('categories/all', categories);
  });

});

// Pass categories to new quiz select
router.get('/new', function(req, res) {
  Models.User.findAll({}).then((results) => {
    var users = {
      users: results
    };
    res.render('categories/new', users);
  });

});

router.get('/:id', function(req, res) {
  var catId = req.params.id;
  Models.Category.findOne({
    where: { id: catId },
    include: [{
      model: Models.Quiz,
      through: Models.QuizCategory,
    }]
  }).then((results) => {
    var category = {
      category: results
    };
    // res.json(category);
    res.render('categories/single', category);
  });

});



// =========== POST ROUTES ===========
// Create Category

router.post('/create', upload.single('image'), (req, res) => {
  var imageName;
  if (!req.file) {
    imageName = "cat_default.jpg";
  } else {
    imageName = req.file.originalname;
  }
  Models.Category.create({
    name: req.body.name,
    description: req.body.description,
    image: imageName,
    category_id: req.body.category
  }).then(function() {
    res.redirect('/categories');
  })
});


module.exports = router;