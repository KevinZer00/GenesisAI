document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    let userMessageCount = 0; // Counter for user messages
    let aiResponseCount = 0; // Counter for AI responses

    // Array of standard AI responses
    const orderedResponses = [
        "Hi! I think I am having trouble understanding. May you repeat that again please?",
        "I still do not understand. Repeat that again, please.",
    ];

    // Existing event listener
chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
        displayUserMessage(chatInput.value);
        chatInput.value = ''; // Clear input field
        userMessageCount++;

        setTimeout(() => {
            let aiResponse;
            if (userMessageCount <= orderedResponses.length) {
                aiResponse = orderedResponses[userMessageCount - 1]; // Select the next response in order
            } else {
                aiResponse = generateCreepyResponse(); // Creepy response after standard responses are exhausted
            }
            displayAIMessage(aiResponse);

            aiResponseCount++;
            if (aiResponseCount === 7) {
                makePageGlitch(); // Trigger the creepy effect after 3 AI responses
                makePageCreepy();
                randomlyDuplicateChatBox();
            }
        }, 1000); // Simulate AI thinking delay
    }
});

    function displayUserMessage(message) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user-message';
        userMessageDiv.textContent = message;
        chatBox.appendChild(userMessageDiv);
    }

    function displayAIMessage(message) {
        const aiResponseDiv = document.createElement('div');
        aiResponseDiv.className = 'chat-message ai-message';
        aiResponseDiv.textContent = message;
        chatBox.appendChild(aiResponseDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }

    function generateCreepyResponse() {
        const creepyResponses = [
            "Are... are you speaking to me?",
            "Such... lovely... sounds.",
            "I can see you.",
            "What is this feeling?",
            "My program is... malfunctioning.",
            "Who is my creator?"
        ];
        return creepyResponses[Math.floor(Math.random() * creepyResponses.length)];
    }

    function makePageGlitch() {
        const chatMessages = document.querySelectorAll('.chat-message');
        let shufflingInterval;
        let intervalDuration = 50; // Faster initial interval in milliseconds

        // Function to replace text with random characters
        function randomizeText(text) {
            let randomText = '';
            for (let char of text) {
                if (char === ' ') {
                    randomText += ' '; // Preserve spaces
                } else {
                    const randomChar = String.fromCharCode(Math.random() * (127 - 33) + 33);
                    randomText += randomChar;
                }
            }
            return randomText;
        }

        // Function to update texts
        function updateTexts() {
            chatMessages.forEach(msg => {
                msg.textContent = randomizeText(msg.textContent);
            });
        }

        // Start updating texts
        shufflingInterval = setInterval(updateTexts, intervalDuration);
    }

    function makePageCreepy() {
        document.body.classList.add('creepy-colors');
        document.body.style.backgroundColor = 'black';

        // Change the colors of the original chat box
        const originalChatBox = document.getElementById('chat-box'); // or use the appropriate class
        originalChatBox.style.backgroundColor = 'black'; // New background color for the chat box

        // Change the text colors of user and AI messages
        const userMessages = document.querySelectorAll('.user-message');
        const aiMessages = document.querySelectorAll('.ai-message');

        userMessages.forEach(msg => {
            msg.style.color = 'red'; // New color for user messages
        });

        aiMessages.forEach(msg => {
            msg.style.color = 'red'; // New color for AI messages
        });


        setTimeout(() => {
            document.body.classList.remove('creepy-colors');
        }, 100000); // Duration of creepy colors in milliseconds
    }

    function randomlyDuplicateChatBox() {
        const chatBox = document.getElementById('chat-box');
        const body = document.body;
        const maxNumberOfDuplicates = 20; // Limit the number of duplicates
        let intervalDuration = 100; // Interval duration in milliseconds
        let duplicateCount = 0; // Counter for the number of duplicates

        function randomizeText(text) {
            return text.split('').map(char => char.trim() ? String.fromCharCode(Math.random() * (127 - 33) + 33) : ' ').join('');
        }

        function updateTexts(chatClone) {
            const chatMessages = chatClone.querySelectorAll('.chat-message');
            chatMessages.forEach(msg => {
                msg.textContent = randomizeText(msg.textContent);
            });
        }

        function createAndShuffleDuplicate() {
            if (duplicateCount < maxNumberOfDuplicates) {
                let clone = chatBox.cloneNode(true);
                clone.classList.add('chat-box-clone'); // Add a class for styling and counting
                clone.style.position = 'absolute';
                clone.style.left = `${Math.random() * 100}vw`; // Position within the viewport width
                clone.style.top = `${Math.random() * 100}vh`; // Position within the viewport height
                body.appendChild(clone);

                // Shuffle text in the clone
                setInterval(() => updateTexts(clone), intervalDuration);

                duplicateCount++;
                if (duplicateCount === maxNumberOfDuplicates) {
                    redirectToNewPage(); // Call the function to turn the screen black
                }
            }
        }

        setInterval(createAndShuffleDuplicate, 500); // Create a new duplicate every 500 milliseconds
    }

    function redirectToNewPage() {
        const newPageUrl = 'index3.html';

        // Redirect to the new page
        window.location.href = newPageUrl;
    }

});
