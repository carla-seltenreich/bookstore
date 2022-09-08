const router = require('express').Router();

router.get('/web/users', function(req, res) {
    res.render('pages/users');
});

router.get('/web/categories', function(req, res) {
    res.render('pages/categories');
});

router.get('/web/publishers', function(req, res) {
    res.render('pages/publishers');
});

router.get('/web/books', function(req, res) {
    res.render('pages/books');
});



module.exports = router;