let conversationHistory = [{
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
}]

document.getElementById('problemForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('problem').value;
    document.getElementById('response').innerHTML = "Fetching response from Groq AI...";

    conversationHistory.push({
        role: 'user',
        content: query
    })

    const response = await fetch(`https://localhost:5000/study`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: conversationHistory,
            model: 'llama-3.3-70b-versatile' 
        })
    });

    const completion = await response.json();

    conversationHistory.push({
        role: 'assistant',
        content: completion.choices[0].message.content
    })


    document.getElementById('response').innerHTML = `<p><strong>Groq AI Response:</strong> ${completion.choices[0].message.content}</p>`;
});