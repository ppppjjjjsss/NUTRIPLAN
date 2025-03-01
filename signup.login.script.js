const wrapper = document.querySelector ('.wrapper');
const loginLink = document.querySelector ('.login-link');
const registerLink = document.querySelector ('.register-link');
const btnPopup = document.querySelector ('.btnLogin-popup');
const iconClose = document.querySelector ('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});
btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('icon-close');

})
document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Here you can add code to handle user authentication (e.g., check credentials)
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // For demonstration, we assume the login is always successful
        // In a real application, you would validate the credentials here
        console.log('Login successful for:', email);
        
        // Redirect to home page
        window.location.href = 'home/home.html';
    });

    // Handle Signup Form Submission
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Here you can add code to handle user registration (e.g., send data to a server)
        const username = document.getElementById('username').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // For demonstration, we assume the signup is always successful
        // In a real application, you would send the data to a server and handle the response
        console.log('Signup successful for:', username, email);

        // Redirect to home page
        window.location.href = 'home/home.html';
    });
});
// signup.login.script.js

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    const data = {
        username: formData.get('username'),
        signupEmail: formData.get('signupEmail'),
        signupPassword: formData.get('signupPassword')
    };

    // Send data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Signup Success:', data);
        // Optionally, reset the form or show a success message
        this.reset();
        alert(data.message); // Show success message
    })
    .catch((error) => {
        console.error('Signup Error:', error);
        alert('An error occurred during signup. Please try again.'); // Show error message
    });
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    const data = {
        loginEmail: formData.get('loginEmail'),
        loginPassword: formData.get('loginPassword')
    };

    // Send data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login Success:', data);
        // Handle successful login (e.g., redirect or show a message)
        alert(data.message); // Show success message
    })
    .catch((error) => {
        console.error('Login Error:', error);
        alert('An error occurred during login. Please try again.'); // Show error message
    });
});
// signup.login.script.js

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    const data = {
        username: formData.get('username'),
        signupEmail: formData.get('signupEmail'),
        signupPassword: formData.get('signupPassword')
    };

    // Send data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Signup Success:', data);
        this.reset(); // Reset the form
        alert(data.message); // Show success message
    })
    .catch((error) => {
        console.error('Signup Error:', error);
        alert('An error occurred during signup. Please try again.'); // Show error message
    });
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

  // Collect form data
const formData = new FormData(this);
const data = {
    loginEmail: formData.get('loginEmail'),
    loginPassword: formData.get('loginPassword')
};

// Send data to the server
fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log('Login Success:', data);
    alert(data.message); // Show success message
})
.catch((error) => {
    console.error('Login Error:', error);
    alert('An error occurred during login. Please try again.')
}
)})
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nutriPlan', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User ', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser  = new User({ username, email, password });
    await newUser .save();
    res.status(201).send('User  registered');
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username'); // Updated ID
    const submitButton = document.getElementById('submit-username');
    const usernameDisplay = document.getElementById('username-display');

    // Load username from localStorage if it exists
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        usernameDisplay.textContent = savedUsername; // Display saved username
    }

    // Event listener for the submit button
    submitButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();

        // Check if the username is not empty
        if (username) {
            usernameDisplay.textContent = username; // Update the header with the username
            localStorage.setItem('username', username); // Save username to localStorage
            usernameInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid username.'); // Alert if the input is empty
        }
    });
});