var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/*Author page*/
router.get('/author', function(req, res, next) {
  res.render('author');
});

// Autoload de rutas con :quizId
router.param('quizId', quizController.load);

//Rutas de quizzes
router.get('/quizzes',                     quizController.index);
router.get('/quizzes/:quizId(\\d+)',       quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);


module.exports = router;
