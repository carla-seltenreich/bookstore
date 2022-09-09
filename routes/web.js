const router = require('express').Router();
const UserModel = require('../models/User');
const crypto = require('crypto');

crypt = (text) => {
    return crypto.createHash('sha256').update(text).digest('hex');
}

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

router.post('/web/login', async (req, res) => {
    let user = await UserModel.findAll({
        where: {
            email: req.body.email,
            password: crypt(req.body.password)
        }
    })

if(user.length > 0) {
    req.session.auth = {
        email: req.body.email,
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