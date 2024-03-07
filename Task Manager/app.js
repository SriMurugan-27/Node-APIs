const express = require('express');
const app = express();
const db = require('./db/connect');
const tasks = require('./routes/tasks');
require('dotenv').config();
require('express-async-errors');

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);

const port = process.env.NODE_ENV || 3000;

const run = async () => {
    try{
        await db(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listenUp ${port}...`));
    }catch(err){
        console.error(err);
    }
};

run();
