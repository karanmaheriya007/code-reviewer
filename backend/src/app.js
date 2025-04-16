const express = require('express');
const aiRouter = require('./routes/ai.route');
const cors = require('cors');

const app = express();

// app.use(cors({
//     origin: ['https://code-reviewer-orcin.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

const allowedOrigins = [
    'https://code-reviewer-orcin.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('I am code Reviewer');
});

app.use('/ai', aiRouter);

module.exports = app;