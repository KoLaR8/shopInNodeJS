var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.clearCookie('session')
    res.render("login")
})

module.exports = router;