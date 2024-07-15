const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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

const userRoutes = require('./controller/user');

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})