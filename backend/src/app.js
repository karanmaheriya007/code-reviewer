const express = require('express');
const aiRouter = require('./routes/ai.route');
const cors = require('cors');

const app = express();

// Update CORS configuration with specific options
app.use(cors({
    origin: ['http://localhost:5173', 'https://code-reviewer-orcin.vercel.app/'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRouter);

module.exports = app;