import { Router } from "express";
import { isAuthenticated } from "../public/js/authMiddleware.js";

const router = Router();

router.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('register');
    }
});

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/products');
    } else {
        res.render('login');
    }
});

router.get('/profile', isAuthenticated, (req, res) => {
    const userInfo = {
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
    };
    console.log(userInfo);
    res.render('profile', userInfo);
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/login');
    });
});

export default router;