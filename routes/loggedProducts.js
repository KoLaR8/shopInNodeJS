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
    if(req.is_authorized) {
        var sql = `SELECT product_id, name, price, old, description, image, products.category_id FROM products WHERE product_id = '${req.params.id}';`
        connection.query(sql, [2, 1], (error, results) => {
            console.log(req.params.id + results)
            if (error) throw error;
            res.render('loggedProducts', {products: results[0]})
        })
    }
    else{
        res.redirect('login');
    }
})

module.exports = router;