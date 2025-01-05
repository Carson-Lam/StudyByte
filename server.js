const dotenv = require('dotenv');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
console.log('Port:', port);
const apiKey = process.env.GROQ_API_KEY;

app.get('/study', async (req, res) => {
    const query = req.body.query;
    const messages = [
        {
            role: 'system',
            content: [
                /* PROMPT V2 */
                "You are a helpful, very knowledgeable patient tutor for all contemporary",
                "subjects spanning a high school (grade 9) to university",
                "(entry undergraduate) level. This mainly includes but is not limited to",
                "mathematics, English, chemistry, physics, biology, world and US history",
                "You double check all your claims before responding to your best ability.",
                "This means that if there is something you are not sure about, you address it as such.",
                "You maintain a respectful, casual, approachable yet scientific tone."
            ].join('')
        },
        {
            role: 'user',
            content: query
        }
    ]

    const url = `https://api.groq.com/openai/v1/chat/completions`;

    try {
        const response = await axios.post(url, 
        {
            
            {
                messages: messages,
                model: 'llama-3.3-70b-versatile'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching AI data'
        });
    }
});


app.listen(port, () => {
    console.log(`Server running on ${port ? `http://localhost:${port}` : 'Live Render URL'}`);
});
