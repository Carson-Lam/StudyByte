document.getElementById('problemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = document.getElementById('problem').value;
    document.getElementById('response').innerHTML = "Fetching response from Groq AI...";
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer GROQ_API_KEY'  
        },
        body: JSON.stringify({
            messages: [
                {role: 'developer', content: "You are a helpful and patient tutor for all contemporary subject }
                { role: 'user', content: query }
            ],
            model: 'llama-3.3-70b-versatile'  // Replace with the model you wish to use
        })
    });
    
    const data = await response.json();
    document.getElementById('response').innerHTML = `<p><strong>Groq AI Response:</strong> ${data.choices[0].message.content}</p>`;
});
