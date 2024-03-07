const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProduct = require('./products.json');
require('dotenv').config();

const run = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        console.log('Success!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

run();