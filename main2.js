document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    let userMessageCount = 0;
    let aiResponseCount = 0;

    const orderedResponses = [
        "Hi! I think I am having trouble understanding. May you repeat that again please?",
        "I still do not understand. Repeat that again, please.",
    ];

chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
        displayUserMessage(chatInput.value);
        chatInput.value = ''; 
        userMessageCount++;

        setTimeout(() => {
            let aiResponse;
            if (userMessageCount <= orderedResponses.length) {
                aiResponse = orderedResponses[userMessageCount - 1]; 
            } else {
                aiResponse = generateCreepyResponse();
            }
            displayAIMessage(aiResponse);

            aiResponseCount++;
            if (aiResponseCount === 7) {
                makePageGlitch(); // Trigger the creepy effect after 3 AI responses
                makePageCreepy();
                randomlyDuplicateChatBox();
            }
        }, 1000);
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
        chatBox.scrollTop = chatBox.scrollHeight; 
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


    // Function to simulate page "glitching"
    function makePageGlitch() {
        const chatMessages = document.querySelectorAll('.chat-message');
        let shufflingInterval;
        let intervalDuration = 50; 

        // Function to replace text with random characters
        function randomizeText(text) {
            let randomText = '';
            for (let char of text) {
                if (char === ' ') {
                    randomText += ' '; 
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


    // Function to change overall colors of current page
    function makePageCreepy() {
        document.body.classList.add('creepy-colors');
        document.body.style.backgroundColor = 'black';

        // Change the colors of the original chat box
        const originalChatBox = document.getElementById('chat-box'); 
        originalChatBox.style.backgroundColor = 'black'; 

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
        }, 100000); 
    }

    function randomlyDuplicateChatBox() {
        const chatBox = document.getElementById('chat-box');
        const body = document.body;
        const maxNumberOfDuplicates = 20; 
        let intervalDuration = 100; 
        let duplicateCount = 0; 

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
                clone.classList.add('chat-box-clone'); 
                clone.style.position = 'absolute';
                clone.style.left = `${Math.random() * 100}vw`; 
                clone.style.top = `${Math.random() * 100}vh`;
                body.appendChild(clone);

                // Shuffle text in the clone
                setInterval(() => updateTexts(clone), intervalDuration);

                duplicateCount++;
                if (duplicateCount === maxNumberOfDuplicates) {
                    redirectToNewPage(); 
                }
            }
        }

        setInterval(createAndShuffleDuplicate, 500);
    }

    function redirectToNewPage() {
        const newPageUrl = 'index3.html';

        window.location.href = newPageUrl;
    }

});
