const express = require('express');
const aiRouter = require('./routes/ai.route');
const cors = require('cors');

const app = express();

// app.use(cors({
//     origin: ['https://code-reviewer-orcin.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use(express.json());

app.get('/', (req, res) => {
    res.send('I am code Reviewer');
});

app.use('/ai', aiRouter);

module.exports = app;