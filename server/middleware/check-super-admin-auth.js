const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error("Authentication failed!");
        }
        const decodedToken = jwt.verify(token, "superdupersecret_dont_share");

        req.userData = { superId: decodedToken.superId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication fail!", 403);
        return next(error);
    }
};