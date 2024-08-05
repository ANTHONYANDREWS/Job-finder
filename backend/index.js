import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {userRoutes} from './routes/user.js'
import router from './routes/restify.js'

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/local-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/api', userRoutes);
app.use(router);
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        const errors = {};
        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ message: 'Validation Error', errors: errors });
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        const keyValue = err.keyValue;
        const errorMessage = `Duplicate key error for ${Object.keys(keyValue)[0]}: ${keyValue[Object.keys(keyValue)[0]]}`;
        return res.status(400).json({ message: 'Duplicate key error', error: errorMessage });
    }
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})