const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB Atlas!...'))
        .catch(err => console.error(err));
};

module.exports = connectDB;