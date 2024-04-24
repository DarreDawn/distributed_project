// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLHUMYvjs2zDyKMYNcEdIKd_6V3i9EKzc",
    authDomain: "distributed-project-32dc4.firebaseapp.com",
    projectId: "distributed-project-32dc4",
    storageBucket: "distributed-project-32dc4.appspot.com",
    messagingSenderId: "368318225640",
    appId: "1:368318225640:web:b5d6054a9ca63ddfbfbd5d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

// Function to handle the display of the chat box
function showChatBox(doctor) {
    const chatBox = document.querySelector('.chat-container');
    chatBox.style.display = 'flex'; // Make sure this matches your CSS display property for .chat-container
    const chatHeader = chatBox.querySelector('.chat-header h2');
    chatHeader.textContent = `Chat with ${doctor.name}`; // Personalize the chat header with the doctor's name
}

// Function to create and display doctor items
async function displayDoctors() {
    try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const doctorsListContainer = document.getElementById('doctors-list');

        // Clear existing list
        doctorsListContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const doctor = doc.data();
            const doctorItem = document.createElement('div');
            doctorItem.classList.add('doctor-item');

            const button = document.createElement('button');
            button.type = 'button';
            button.onclick = () => showChatBox(doctor);

            const circle = document.createElement('div');
            circle.classList.add('doctor-item-circle');
            // Set a default color if none is specified
            circle.style.backgroundColor = doctor.colorPreference || 'gray';

            const name = document.createElement('span');
            name.textContent = doctor.name;

            button.appendChild(circle);
            button.appendChild(name);
            doctorItem.appendChild(button);

            doctorsListContainer.appendChild(doctorItem);
        });

        console.log('Doctors have been displayed.');
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}


// WebSocket connection setup
const socket = new WebSocket('wss://distrubuted-system-project.herokuapp.com/chat');

// Function to send messages through WebSocket
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    socket.send(JSON.stringify({ text: message }));
    messageInput.value = ''; // Clear the input after sending
}

// WebSocket event listeners
socket.onmessage = function(event) {
    const messageData = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = messageData.text;
    messageElement.classList.add('message');

    const chatBox = document.getElementById('chat-box');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
};

socket.onopen = function(event) {
    console.log('WebSocket connection established');
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};

socket.onerror = function(error) {
    console.error('WebSocket Error: ' + error);
};

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    await displayDoctors();
});


document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('doctor-search').addEventListener('input', async function() {
    const searchTerm = this.value.toLowerCase();
    const querySnapshot = await getDocs(collection(db, "doctors"));
    const doctorsListContainer = document.getElementById('doctors-list');

    // Clear the list for new filtered results
    doctorsListContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const doctorData = doc.data();
        const doctorName = doctorData.name.toLowerCase();
        if (doctorName.includes(searchTerm)) {
            // Create a list item for the doctor that matches the search term
            const doctorItem = document.createElement('div');
            doctorItem.classList.add('doctor-item');

            const button = document.createElement('button');
            button.type = 'button';
            button.onclick = () => showChatBox(doctorData);

            const circle = document.createElement('div');
            circle.classList.add('doctor-item-circle');
            // Set a default color if none is specified
            circle.style.backgroundColor = doctorData.colorPreference || 'gray';

            const name = document.createElement('span');
            name.textContent = doctorData.name;

            button.appendChild(circle);
            button.appendChild(name);
            doctorItem.appendChild(button);

            // Append the doctor item to the list container
            doctorsListContainer.appendChild(doctorItem);
        }
    });
});

