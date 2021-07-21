const jwt = require("jsonwebtoken"),
    C = require('./constante');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, C.TOKEN_KEY);
        next();
    } catch (e) {
        res.status(403).json("Not authorized");
    }
};