/**
*created by ding wenjie at 2017-02-16 13:29:32
*这里最好用连接池来写。来日再改吧。
*/

//import mysql from 'mysql';
var mysql = require('mysql');

module.exports = new Users;

function Users(){}
//shu xing
Users.prototype.flag = false;
//fang fa
Users.prototype.connection = mysql.createConnection({
  'host':'127.0.0.1',
  'user':'root',
  'password':'',
  'database':'ding_demo'
});
//lian jie
Users.prototype.connect = function(){
  if(this.flag==true) return 'already connected!';
  this.connection.connect();
  this.flag = true ;
  return 'connect successful!';
}

Users.prototype.closeConnect = function(){
  if(flag == false) return 'already closed.';
  this.connection.end();
  this.flag = flase;
  return 'close connection successful.';
}

Users.prototype.adduser = function(username,password){
  //please check out the type of data at front-end first.
  var queryStr = `insert into users values(${username},"${password}")`;
  console.log(queryStr);
  this.connect();

  this.connection.query(queryStr,function(err,rows,fields){
    if(err) throw err;
    //console.log('The solution is: ', rows[0].solution);
    console.log('query ended.');
  });
}
// username example 10141282.
Users.prototype.findUser = function(username){
  //please check out the type of data at front-end first.
  var queryStr = `select * from table users where username == "${username}"`;
  this.connect();

  this.connection.query(queryStr,function(err,rows,fields){
    if(err) throw err;

    for(var i=0;i<rows.length;i++){
      console.log(rows[i].username+'    '+rows[i].password);
    }
    return rows;
  })
}

Users.prototype.findAll = function (callback){
  var queryStr = 'select * from users';
  var Ans = {};
  this.connect();
  this.connection.query(queryStr,function(err,rows,fields){
    if(err) throw err;
    console.log('query in database.');
    //console.log(rows);

    for(var i=0;i<rows.length;i++){
      // Ans += `user account  is: ${rows[i].username}`+
      // `user password is ${rows[i].password}\n`;
      Ans[i]=[rows[i].username,rows[i].password];
    }

    console.log('Query message 1');
    console.log(rows);
    console.log('Query message 2');
    console.log(Ans);
    callback(null, Ans);
  })
}
