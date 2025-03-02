const express = require('express');
const aiRouter = require('./routes/ai.route');
const cors = require('cors');

const app = express();

// Update CORS configuration with specific options
// CORS Configuration
app.use(cors({
    origin: ['https://code-reviewer-orcin.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRouter);

module.exports = app;