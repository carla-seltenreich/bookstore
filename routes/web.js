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

router.post('/login', (req, res) => {
    var email = 'carla@c';
    var password = 123;

    if (req.body.email == email && req.body.password == password) {
        res.redirect('/web/home')
    } else {
        res.redirect('/web/login')
        
    }
})
router.get('/login', (req, res) => {
    if (req.session.email) {
        res.redirect('web/home')
    } else
        res.redirect('web/login')
});

module.exports = router;