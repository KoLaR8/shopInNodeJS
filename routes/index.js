var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopWWW',
  multipleStatements: true
})

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT name, price, image, category_id FROM products; SELECT name FROM categories";

  connection.query(sql, [2,1], (error, results, fields) =>{
    if(error) throw error;
    res.render('index', {categories: results[1], products: results[0]})
    console.log(results[0])
  })
});

module.exports = router;
