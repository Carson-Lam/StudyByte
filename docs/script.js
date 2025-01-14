let conversationHistoryShort = [{
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

let conversationHistoryLong = [{
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

let expanded = false;

document.getElementById('problemForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('BLAAAA');
    const expandableElements = document.querySelectorAll(".expandable");

    bootstrap.Collapse.getInstance(document.getElementById('collapseShort'))?.hide();
    bootstrap.Collapse.getInstance(document.getElementById('collapseLong'))?.hide();

    expandableElements.forEach(element => {
        element.style.visibility = "hidden";
        element.style.lineHeight = "0";
        element.style.paddingTop = "0";
        element.style.paddingBottom = "1em";
        element.style.color = "transparent";
        
    });

    expanded ? setTimeout(() => {
            expandableElements.forEach(element => {
                element.style.visibility = "visible";
                element.style.lineHeight = "1.5";
                element.style.paddingTop = "1em";
                element.style.paddingBottom = "1em";
                element.style.color = "white";
            });
        }, 550) : expandableElements.forEach(element => {
            element.style.visibility = "visible";
            element.style.lineHeight = "1.5";
            element.style.paddingTop = "1em";
            element.style.paddingBottom = "1em";
            element.style.color = "white";
        });
    expanded = true;

});

document.getElementById('collapseShort').addEventListener('shown.bs.collapse', async function (event) {
    // event.preventDefault();
    conversationHistoryShort.push({
        role: 'system',
        content: [
            "You are a very helpful tutor, as explained in the previous prompt.",
            "However, you only give short, direct, concise answers that are no more than ",
            "two sentences long, and extremely accurate. For a math problem, only provide the ",
            "final answer. For mathematical definitions, you can include the formulaic definition of the concept. ",
            "For literature, history, etc, provide a definitive yet correct answer.",
            "if the answer cannot be accurately summed up in two sentences or less, prompt the user to ",
            "click on the long answer button. "
        ].join('')
    })

    const query = document.getElementById('problem').value;

    console.log('LAST QUERY (Before first recording): ' + document.getElementById('responseShort').getAttribute('data-last-query'))

    if (query === document.getElementById('responseShort').getAttribute('data-last-query')) return;

    document.getElementById('responseShort').setAttribute('data-last-query', query);
    document.getElementById('responseShort').innerHTML = "Fetching response from Groq AI...";

    console.log('LAST QUERY (after first recording): ' + document.getElementById('responseShort').getAttribute('data-last-query'))

    conversationHistoryShort.push({
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
                messages: conversationHistoryShort,
                model: 'llama-3.3-70b-versatile'
            })
        });

        const completion = await response.json();

        conversationHistoryShort.push({
            role: 'assistant',
            content: completion.choices[0].message.content
        })


        document.getElementById('responseShort').innerHTML = `<p><strong>Nice Groq AI Response:</strong> ${completion.choices[0].message.content}</p>`;
    } catch (error) {
        console.error('Error: ', error.message);
        document.getElementById('responseShort').innerHTML = 'Error fetching response'
    }
});

document.getElementById('collapseLong').addEventListener('shown.bs.collapse', async function (event) {
    event.preventDefault();
    conversationHistoryLong.push({
        role: 'system',
        content: [
            "You are a very helpful tutor, as explained in the previous prompt.",
            "provide the answer first, and then an explanation ",
            "You give longer, more detailed answers that break down the problem asked compared to ",
            "the short answer button on the left. Do not make the answer too long, but cover all important points. ",
            "Where applicable, explain how you arrived to the answer ",
            "use bullet points whenever applicable for better formatting. ",
            "ensure your answers are accurate. "
        ].join('')
    })

    const query = document.getElementById('problem').value;

    console.log('LAST QUERY:' + document.getElementById('responseShort').getAttribute('data-last-query'))

    if (query === document.getElementById('responseLong').getAttribute('data-last-query')) return;


    document.getElementById('responseLong').setAttribute('data-last-query', query);
    document.getElementById('responseLong').innerHTML = "Fetching response from Groq AI...";


    conversationHistoryLong.push({
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
                messages: conversationHistoryLong,
                model: 'llama-3.3-70b-versatile'
            })
        });

        const completion = await response.json();

        conversationHistoryLong.push({
            role: 'assistant',
            content: completion.choices[0].message.content
        })


        document.getElementById('responseLong').innerHTML = `<p><strong>Mean Groq AI Response:</strong> ${completion.choices[0].message.content}</p>`;
    } catch (error) {
        console.error('Error: ', error.message);
        document.getElementById('responseLong').innerHTML = 'Error fetching response'
    }
});