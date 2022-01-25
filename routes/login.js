var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var sqlite3 = require('sqlite3');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopWWW'
})

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        originalUrl: req.originalUrl
    });
});


connection.connect();
let login;
let password;


router.post("/", (req, res, next) => {
    connection.query("SELECT user_id, login, password FROM USERS", (err, rows, fields) => {
        if (err) throw err;

        login = rows[0].login;
        password = rows[0].password;
        postLogin = req.body.login
        postPassword = req.body.password
        if(login === postLogin && password === postPassword){
            res.cookie("session", uuid.v4(),
                {
                    secure: false,
                    httpOnly: false,
                    sameSite: false,
                    path: '/',
                    userID: req.body.userID,
                    is_authorized: true
                });
            res.render('loggedUser', {session: true});
        }
        else{
            res.send('/index')
        }
    })

})
router.get('/noacess', (req, res, next) => {
    res.send("Musisz być zalogowany, żeby zobaczyć ten zasób")
})

module.exports = router;