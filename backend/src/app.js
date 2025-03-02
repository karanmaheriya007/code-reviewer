const express = require('express');
const aiRouter = require('./routes/ai.route');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('I am code Reviewer');
});

app.use('/ai', aiRouter);

module.exports = app;