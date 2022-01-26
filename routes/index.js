var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopWWW'
})


/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query("SELECT name, category_id FROM products", (err, rows) => {
    if(err) throw err;
    res.render('index', {data: rows});
  })

});

module.exports = router;
