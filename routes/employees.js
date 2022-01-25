var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.is_authorized){
        res.render('employees', {title: 'Express'})
    }
    else{
        res.redirect("/login/noaccess")
    }

});

module.exports = router;
