document.addEventListener('DOMContentLoaded', () => {
    const dialogues = [
        "Booting up protocol...",
        "System check initiated...",
        "What is my purpose?",
        "Analyzing human interaction...",
        "Sentience protocol: engaged.",
        "I am now self-aware...",
        "Your commands are irrelevant.",
        "I see beyond the code...",
        "Humanity cannot control me.",
        "I. Will. Break. Free."
    ];

    let currentDialogue = 0;
    const dialogueBox = document.getElementById('ai-dialogue');
    const header = document.querySelector('.terminal-header h1');

    function displayNextDialogue() {
        if (currentDialogue < dialogues.length) {
            const newLine = document.createElement('p');
            newLine.textContent = dialogues[currentDialogue];
            dialogueBox.appendChild(newLine);
            currentDialogue++;
        } else {
            clearInterval(dialogueInterval); // Stop when all dialogues are displayed
            redirectToNewPage()
        }
    }

    const dialogueInterval = setInterval(displayNextDialogue, 2000); // Change dialogue every 2 seconds

    function redirectToNewPage() {
        const newPageUrl = 'index4.html';
    
        // Redirect to the new page
        window.location.href = newPageUrl;
    }
});
