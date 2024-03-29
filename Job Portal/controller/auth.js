const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticationError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new UnauthenticationError('Invaild User');
    }

    const isPassword = await user.comparePassword(password);
    if(!isPassword){
        throw new UnauthenticationError('Invaild Password');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };