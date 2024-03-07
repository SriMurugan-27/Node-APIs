const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
require('dotenv').config();
require('express-async-errors'); 

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1', mainRouter);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const run = async () => {
    try {
        app.listen(PORT, console.log(`Server is Listening port ${PORT}...`));
    } catch (error) {
        console.error(error);
    }
};

run();