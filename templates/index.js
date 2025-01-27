const responses = {
    "start": {
        message: "Hi! I'm CareerBot. How can I assist you today?",
        options: ["I want to explore career options"]
    },
    "i want to explore career options": {
        message: "What's your education?",
        options: ["10th", "12th"]
    },
    "10th": {
        message: "Choose one option after 10th.",
        options: ["12th", "Diploma"]
    },
    "12th": {
        message: "Choose the subject you are comfortable with.",
        options: ["PCMB", "PCB", "PCM"]
    },
    "pcmb": {
        message: "You can go with BSc, Pharmacy, or Biotechnology.",
        options: ["Okay, thank you"]
    },
    "pcb": {
        message: "You can go with Nurse or Doctor.",
        options: ["Okay, thank you"]
    },
    "pcm": {
        message: "You can go with BE, BTech, or NDA.",
        options: ["Okay, thank you"]
    },
    "diploma": {
        message:
            "You can choose your favorite stream like Computer, IT, Civil, Mechanical, and then pursue a degree in it.",
        options: ["Okay, thank you"]
    },
    "okay, thank you": {
        message: "I love to assist you again!",
        options: []
    }
};

function initializeChat() {
    appendMessage("bot", responses["start"].message, responses["start"].options);
}

function handleUserInput() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();

    if (userMessage) {
        handleUserChoice(userMessage);
        inputField.value = ""; // Clear the input field
    }
}

function handleUserChoice(choice) {
    appendMessage("user", choice);

    // Get response for the user input
    const botResponse = responses[choice.toLowerCase()] || {
        message: "I'm sorry, I didn't understand that. Please choose an option below.",
        options: responses["start"].options
    };

    appendMessage("bot", botResponse.message, botResponse.options);
}

function appendMessage(sender, message, options = []) {
    const chatBox = document.getElementById("chat-box");

    // Add the message
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
    messageElement.innerHTML =
        sender === "bot" ? `<span class="bot-name">CareerBot:</span> ${message}` : message;
    chatBox.appendChild(messageElement);

    // Add options if provided
    if (options.length > 0) {
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => handleUserChoice(option);
            optionsContainer.appendChild(button);
        });

        chatBox.appendChild(optionsContainer);
    }

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

window.onload = initializeChat;
