var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopWWW',
})


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.is_authorized){
        let user = req.cookies["session"];
        let sql = `SELECT * FROM products join shoppingcardproducts on products.product_id = shoppingcardproducts.id_product WHERE id_user = ` + user;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.render('card', {user: user, products: result})
        })

    }
    else{
        res.redirect("/login/noacess")
    }

});

router.get('/remove/:id', (req, res) => {
    if(req.is_authorized){
        let sql = `DELETE FROM shoppingcardproducts WHERE id_product = '${req.params.id}'`
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.redirect('../../card');
        })
    }
    else{
        res.redirect("/login/noacess")
    }
})

router.get('/add/:id', (req, res) => {
    if(req.is_authorized){
        let user = req.cookies["session"];
        let sql = `INSERT INTO shoppingcardproducts(id_product, id_user) VALUES ('${req.params.id}', '${user}')`
        connection.query(sql, (err) => {
            if(err) throw err;
            res.redirect('../../card');
        })
    }
    else{
        res.redirect("/login/noacess")
    }
})

module.exports = router;