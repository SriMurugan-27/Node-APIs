const express = require('express');
const app = express();
const products = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.json());
app.use('/api/v1/products', products);
app.use(errorHandler);
app.use(notFound);

//Home Page
app.get('/', (req, res) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products'>Products</a>");
});


const port = process.env.PORT || 3000;
const run = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is Listening port ${port}...`));
    }catch(err){
        console.log(err);
    }
};

run();