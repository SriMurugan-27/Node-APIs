require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//DataBase Connection
const connectDB = require('./db/connect');

//User Authentication System
const authenticateUser = require('./middleware/authentication');

//Routes
const authRoutes = require('./routes/auths');
const jobRoutes = require('./routes/jobs');

//Error Handling
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/notFound');

app.set('trust proxy', 1);
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.status(200).send('Job API Server is Up and Running!...');
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs',authenticateUser ,jobRoutes);
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

const run = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

run();