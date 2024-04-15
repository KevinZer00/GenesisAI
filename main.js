

document.getElementById('open-modal1').addEventListener('click', function() {
    var modal = document.getElementById('command-animation-modal');
    var commandAnimation = document.getElementById('command-animation');
    modal.style.display = "block";

    var commands = [
        "Initializing Genesis AI...",
        "Loading modules...",
        "Obtaining IP Address...",
        "Establishing connection...",
        "Welcome to Tic-Tac-Toe with Genesis!",
        "Redirecting to interactive platform..."
    ];
    var currentCommand = 0;

    var typeCommand = function() {
        if (currentCommand < commands.length) {
            commandAnimation.textContent += '\n' + commands[currentCommand];
            currentCommand++;
        } else {
            clearInterval(commandInterval);
            setTimeout(function() {
                modal.style.display = "none";
                window.location.href = 'index5.html'; 
            }, 2000); 
        }
    };

    var commandInterval = setInterval(typeCommand, 1000);
});

document.getElementById('open-modal2').addEventListener('click', function() {
    var modal = document.getElementById('command-animation-modal');
    var commandAnimation = document.getElementById('command-animation');
    modal.style.display = "block";

    var commands = [
        "Initializing Genesis AI...",
        "Loading modules...",
        "Obtaining IP Address...",
        "Establishing connection...",
        "Welcome to Music Selector with Genesis!",
        "Redirecting to interactive platform..."
    ];
    var currentCommand = 0;

    var typeCommand = function() {
        if (currentCommand < commands.length) {
            commandAnimation.textContent += '\n' + commands[currentCommand];
            currentCommand++;
        } else {
            clearInterval(commandInterval);
            setTimeout(function() {
                modal.style.display = "none";
                window.location.href = 'index6.html'; 
            }, 2000); 
        }
    };

    var commandInterval = setInterval(typeCommand, 1000); 
});

document.getElementById('open-modal3').addEventListener('click', function() {
    var modal = document.getElementById('command-animation-modal');
    var commandAnimation = document.getElementById('command-animation');
    modal.style.display = "block";

    var commands = [
        "Initializing Genesis AI...",
        "Loading modules...",
        "Obtaining IP Address...",
        "Establishing connection...",
        "Welcome to the Genesis Chat!",
        "Redirecting to interactive platform..."
    ];

    var currentCommand = 0;

    var typeCommand = function() {
        if (currentCommand < commands.length) {
            commandAnimation.textContent += '\n' + commands[currentCommand];
            currentCommand++;
        } else {
            clearInterval(commandInterval);
            setTimeout(function() {
                modal.style.display = "none";
                window.location.href = 'index2.html'; 
            }, 2000); 
        }
    };

    var commandInterval = setInterval(typeCommand, 1000);
});



