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

router.get('/:category', (req, res, next) => {
    var sql = `SELECT products.product_id, products.name, price, old, image, products.category_id FROM products JOIN categories on products.category_id = categories.category_id WHERE categories.name = '${req.params.category}'; SELECT name FROM categories`;
    connection.query(sql, [2,1], (error, results) =>{
        if(error) throw error;
        res.render('loggedUser', {categories: results[1], products: results[0]})
    })
})

module.exports = router;