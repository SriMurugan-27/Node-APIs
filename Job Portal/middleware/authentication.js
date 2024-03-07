const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticationError } = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticationError('Authentication Failed!');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;