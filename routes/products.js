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

router.get('/:id', (req, res, next) => {
    var sql = `SELECT product_id, name, price, old, description, image, products.category_id FROM products WHERE product_id = '${req.params.id}';`
    connection.query(sql, [2,1], (error, results) =>{
        if(error) throw error;
        res.render('products', {products: results[0]})
    })
})

module.exports = router;