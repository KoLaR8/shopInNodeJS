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


router.get('/', function(req, res, next) {
    if(req.is_authorized) {
        var sql = "SELECT product_id, name, image, price, old, category_id FROM products; SELECT name FROM categories";

        connection.query(sql, [2, 1], (error, results, fields) => {
            if (error) throw error;
            res.render('loggedUser', {categories: results[1], products: results[0]})
        })
    }
    else{
        res.redirect('login/noacess');
    }
});

router.get('/?search', function(req, res, next) {
    if(req.is_authorized) {
        var sql = `SELECT product_id, name, price, old, image, category_id FROM products WHERE name LIKE '%${req.query.search}%'; SELECT name FROM categories`;
        connection.query(sql, [2, 1], (error, results) => {
            if (error) throw error;
            res.render('loggedUser', {categories: results[1], products: results[0]})
        })
    }
    else{
        res.redirect('login/noacess');
    }
})

module.exports = router;