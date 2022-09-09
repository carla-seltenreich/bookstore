const router = require('express').Router();

router.get('/web/home', function (req, res) {
    res.render('pages/home');
});
router.get('/web/users', function (req, res) {
    res.render('pages/users');
});

router.get('/web/categories', function (req, res) {
    res.render('pages/categories');
});

router.get('/web/publishers', function (req, res) {
    res.render('pages/publishers');
});

router.get('/web/books', function (req, res) {
    res.render('pages/books');
});

router.get('/web/login', function (req, res) {
    res.render('pages/login');
});

router.post('/web/login', (req, res) => {
    var email = 'carla@c';
    var password = 123;

    if (req.body.email == email && req.body.password == password) {
        req.session.auth = {
            email,
            isLoggedIn: true,
        }
        res.redirect('/web/home');
    } else {
        res.redirect('/web/login');
    }
})

router.get('/web/logout', (req, res) => {
    req.session.auth = null;

    res.redirect('/web/login');
})


module.exports = router;