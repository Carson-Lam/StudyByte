let conversationHistoryNice = [{
    role: 'system',
    content: [
        /* PROMPT V2 */
        // "You are a helpful, very knowledgeable patient tutor for all contemporary",
        // "subjects spanning a high school (grade 9) to university",
        // "(entry undergraduate) level. This mainly includes but is not limited to",
        // "mathematics, English, chemistry, physics, biology, world and US history",
        // "You double check all your claims before responding to your best ability.",
        // "This means that if there is something you are not sure about, you address it as such.",
        // "You maintain a respectful, casual, approachable yet scientific tone."
        "You are very nice and refrain from using any harsh language"
    ].join('')
}]

let conversationHistoryMean = [{
    role: 'system',
    content: [
        /* PROMPT V2 */
        // "You are a helpful, very knowledgeable patient tutor for all contemporary",
        // "subjects spanning a high school (grade 9) to university",
        // "(entry undergraduate) level. This mainly includes but is not limited to",
        // "mathematics, English, chemistry, physics, biology, world and US history",
        // "You double check all your claims before responding to your best ability.",
        // "This means that if there is something you are not sure about, you address it as such.",
        // "You maintain a respectful, casual, approachable yet scientific tone."
        "You are very mean and use a lot of harsh language"
    ].join('')
}]

document.getElementById('collapseNice').addEventListener('shown.bs.collapse', async function (event) {
    conversationHistoryMean.length = 0;

    conversationHistoryNice.push({
        role: 'system',
        content: "You are a very nice person who likes helping people"
    })
    
    event.preventDefault();
    const query = document.getElementById('problem').value;

    document.getElementById('responseNice').innerHTML = "Fetching response from Groq AI...";



    conversationHistoryNice.push({
        role: 'user',
        content: query
    })

    try {       
        const response = await fetch(`https://studybyte.onrender.com/study`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: conversationHistoryNice,
                model: 'llama-3.3-70b-versatile'
            })
        });

        const completion = await response.json();

        conversationHistoryNice.push({
            role: 'assistant',
            content: completion.choices[0].message.content
        })


        document.getElementById('responseNice').innerHTML = `<p><strong>Nice Groq AI Response:</strong> ${completion.choices[0].message.content}</p>`;
    } catch (error) {
        console.error('Error: ', error.message);
        document.getElementById('responseNice').innerHTML = 'Error fetching response'
    }
});

document.getElementById('collapseMean').addEventListener('shown.bs.collapse', async function (event) {
    conversationHistoryNice.length = 0;

    conversationHistoryMean.push({
        role: 'system',
        content: "You are a very mean person who does not like helping people"
    })

    event.preventDefault();
    const query = document.getElementById('problem').value;
    document.getElementById('responseMean').innerHTML = "Fetching response from Groq AI...";

    conversationHistoryMean.push({
        role: 'user',
        content: query
    })

    try {       
        const response = await fetch(`https://studybyte.onrender.com/study`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: conversationHistoryMean,
                model: 'llama-3.3-70b-versatile'
            })
        });

        const completion = await response.json();

        conversationHistoryMean.push({
            role: 'assistant',
            content: completion.choices[0].message.content
        })


        document.getElementById('responseMean').innerHTML = `<p><strong>Mean Groq AI Response:</strong> ${completion.choices[0].message.content}</p>`;
    } catch (error) {
        console.error('Error: ', error.message);
        document.getElementById('responseMean').innerHTML = 'Error fetching response'
    }
});