document.addEventListener("DOMContentLoaded", function() {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Function to append a message to the chat box
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(sender === "user" ? "user-message" : "nimra-message");
        messageDiv.innerText = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Send button click event
    sendBtn.addEventListener("click", function() {
        const message = userInput.value.trim();
        if (message === "") return;
        
        // Append user's message
        appendMessage(message, "user");
        userInput.value = "";

        // Send the message to the Flask API
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Append Nimra's romantic reply
            appendMessage(data.response, "nimra");
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("Oh no, something went wrong...", "nimra");
        });
    });

    // Allow Enter key to send message
    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});
