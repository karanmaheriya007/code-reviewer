const express = require('express');
const aiController = require('../controllers/ai.controller');

const router = express.Router();

router.post('/get-review', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    aiController.getReview
});

module.exports = router;