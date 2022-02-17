var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopWWW'
})

router.post('/', function(req, res, next) {
    res.render('loggedUser')
    if(req.body.Rpassword === req.body.Rpassword2){
        connection.query(`INSERT INTO users (login, email, password) VALUES ('${req.body.Rlogin}', '${req.body.Rmail}', '${req.body.Rpassword}')`)
        res.render('login', {message: "Udało się poprawnie zarejestrować, zaloguj się"})
    }

});

module.exports = router;