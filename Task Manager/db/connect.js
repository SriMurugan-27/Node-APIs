const mongoose = require('mongoose');

const connectionsParms = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectDB = (url) => {
    mongoose.connect(url, connectionsParms)
        .then(() => { console.log('Connected to MongoDB Atlas!...')})
        .catch(err => console.error('Error Occured', err));
};

module.exports = connectDB;