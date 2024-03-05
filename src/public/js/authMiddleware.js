// authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso no autorizado.' });
    }
};

const hasAdminCredentials = (email, password) => {
    return email === 'adminCoder@coder.com' && password === 'adminCod3r123';
};

export { isAuthenticated, isAdmin, hasAdminCredentials };