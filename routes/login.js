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
    connection.query(`SELECT user_id, login, password FROM USERS WHERE login = '${req.body.login}'`, [login, password], (error, results) =>{
        if (error) throw error;
        let result = JSON.parse(JSON.stringify(results));

        if(results.length > 0) {
            login = result[0].login;
            password = result[0].password;
            postLogin = req.body.login;
            postPassword = req.body.password;

                if (login === postLogin && password === postPassword) {
                    res.cookie("session", result[0].user_id,
                        {
                            secure: false,
                            httpOnly: false,
                            sameSite: false,
                            path: '/',
                            is_authorized: true,
                            userID: req.body.user_id
                        })
                    res.redirect("/loggedUser")
                } else {
                    res.render('login', {message: "Nieprawidłowe dane, spróbuj jeszcze raz. "});
                }
        }
        else{
            res.render('login', {message: "Nieprawidłowe dane, spróbuj jeszcze raz. "});
        }
        res.end()
    })

});
router.get('/noacess', (req, res, next) => {
    res.render('login' ,{message: "Musisz być zalogowany żeby zobaczyć ten zasób. "});
})

module.exports = router;