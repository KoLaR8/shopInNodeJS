var express = require('express');
var router = express.Router();
var uuid = require('uuid')

var date = new Date();date.setTime(Date.now() + 1000*360);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.cookie("session", uuid.v4(),
        {
                    secure: false,
                    httpOnly: false,
                    sameSite: false,
                    path: '/',
        });
    res.render('login');
});

router.post("/", (req, res, next) => {
    const user_login = req.body.login;
    const user_password = req.body.password

    console.log(`Proba zalogowania ${user_login} z hasłem ${user_password}`)
})
router.get('/noacess', (req, res, next) => {
    res.send("Musisz być zalogowany, żeby zobaczyć ten zasób")
})

router.get('/logout', (req, res, next) => {
    res.clearCookie('session')

    res.send("Zostałeś wylogowany")
})
module.exports = router;