function typeBotResponse(text, container) {
    let index = 0;
    function type() {
        if (index < text.length) {
            if (text.substr(index, 4) === "<br>") {
                container.innerHTML += "<br>";
                index += 4;
            } else {
                container.innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(type, 30); // Typing speed
        }
    }
    type();
}

function getUserResponse() {
    var userText = $('#textInput').val();
    if (!userText.trim()) return; // Prevent empty input

    var userHTML = `<p class='userText'><span>${userText}</span></p>`;
    $('#textInput').val("");
    $('#chatbox').append(userHTML);

    document.getElementById("userInput").scrollIntoView({ block: 'start', behavior: 'smooth' });

    // Show typing indicator
    var botHTML = "<p class='botText'><span class='typingIndicator'>...</span></p>";
    $('#chatbox').append(botHTML);

    // Get bot response
    $.get("/get", { userMessage: userText }).done(function (data) {
        var botTextContainer = document.querySelector(".typingIndicator");
        botTextContainer.classList.remove('typingIndicator');
        botTextContainer.innerHTML = ""; // Clear typing indicator
        typeBotResponse(data, botTextContainer); // Display bot response with typing effect
    });
}

// Handle Enter keypress and button click
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getUserResponse();
    }
});

$('#buttonInput').click(function () {
    getUserResponse();
});