var express = require('express');
var router = express.Router();
var Users = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });//original code by express.
  console.log(__dirname);
  res.sendFile(__dirname+'/adduser.html');
  // res.end('hello');
});

router.post('/',function(req,res,next){
  console.log(req.body.user_name);
  console.log(req.body.user_password);

  Users.adduser(req.body.user_name,req.body.user_password);
  res.end('submit success');
})

router.get('/allusers',function(req,res,next){
  console.log('from /users+++++++++++++++++');
  Users.findAll(function(error, queryRows){
      res.send(queryRows);
      // console.log('query overed.++++++and answer is'+queryRows+'  what');
  });
})

module.exports = router;
