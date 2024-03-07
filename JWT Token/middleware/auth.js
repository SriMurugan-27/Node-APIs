const jwt = require('jsonwebtoken');
// const { unauthorizedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith('Bearer ')){
    //     throw new unauthorizedError('No token provided');
    // }
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ msg: 'No token provided'});
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username } = decoded;
        req.user = { id, username };
        next()   
    } catch (error) {
        res.status(401).json({ msg: 'No authorized access this route'});
    }
};

module.exports = authenticationMiddleware;