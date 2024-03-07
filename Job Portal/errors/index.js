const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticationError = require('./unauthentication');
const NotFoundError = require('./not-found');

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticationError,
    NotFoundError
};