const dotenv = require('dotenv');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const apiKey = process.env.GROQ_API_KEY;

app.post('/study', async (req, res) => {
    const {messages, model}= req.body;
    const url = `https://api.groq.com/openai/v1/chat/completions`;

    try {
        const response = await axios.post(url, 
        {
            messages, model
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching data from AI API'
        });
    }
});


app.listen(port, () => {
    console.log(`Server running on ${port ? `http://localhost:${port}` : 'Live Render URL'}`);
});