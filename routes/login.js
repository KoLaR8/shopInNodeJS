var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var sqlite3 = require('sqlite3');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopWWW',
    multipleStatements: true
})

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        message: ""
    });
});


connection.connect();
let login;
let password;


router.post("/", (req, res) => {
    connection.query(`SELECT user_id, login, password FROM USERS WHERE login = '${req.body.login}'; SELECT name, price, old, image, category_id FROM products; SELECT name FROM categories`,[3,1], (error, results, fields) =>{
        if (error) throw error;
        let result = JSON.parse(JSON.stringify(results));
        console.log(result[2][0].name);
        login = result[0][0].login;
        password = result[0][0].password;
        postLogin = req.body.login;
        postPassword = req.body.password;
        if(login === postLogin && password === postPassword){
            console.log("it's correct")
            res.cookie("session", uuid.v4(),
                {
                    secure: false,
                    httpOnly: false,
                    sameSite: false,
                    path: '/',
                    userID: req.body.userID,
                    is_authorized: true
                });
            res.redirect("/loggedUser")
        }
        else{
           res.render('login' ,{message: "login or password is incorrect! Please try again. "});
        }
    })

});
router.get('/noacess', (req, res, next) => {
    res.send("Musisz być zalogowany, żeby zobaczyć ten zasób")
})

module.exports = router;