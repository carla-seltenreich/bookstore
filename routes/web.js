const router = require('express').Router();
const UserModel = require('../models/User');
const crypto = require('crypto');

crypt = (text) => {
    return crypto.createHash('sha256').update(text).digest('hex');
}

router.get('/web/books', function (req, res) {
    res.render('pages/books', {
        page: req.url
    });
});
router.get('/web/home', function (req, res) {
    res.render('pages/home', {
        page: req.url
    });
});
router.get('/web/users', function (req, res) {
    res.render('pages/users', {
        page: req.url
    });
});

router.get('/web/categories', function (req, res) {
    res.render('pages/categories', {
        page: req.url
    });
});

router.get('/web/formats', function (req, res) {
    res.render('pages/formats', {
        page: req.url
    });
});

router.get('/web/publishers', function (req, res) {
    res.render('pages/publishers', {
        page: req.url
    });
});

router.get('/web/login', function (req, res) {
    res.render('pages/login', {
        page: req.url
    });
});

router.post('/web/login', async (req, res) => {
    let user = await UserModel.findAll({
        where: {
            email: req.body.email,
            password: crypt(req.body.password)
        }
    })

    if (user.length > 0) {
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
});

router.get('/', (req, res) => {
    if (req.session.auth && req.session.auth.isLoggedIn) {
        res.redirect('/web/home');
    }

    res.redirect('/web/login');
})

module.exports = router;