// server/server.js

// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); // Required for cross-origin requests
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Middleware
// Enable CORS for all origins - IMPORTANT: In production, restrict this to your frontend's domain
app.use(cors()); 
// Parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Configure Nodemailer transporter
// This transporter will be used to send emails.
// You need to set up environment variables for your email service (e.g., Gmail, Outlook, SendGrid, Mailgun).
// For Gmail, you might need to enable "Less secure app access" or use an "App password" if 2FA is on.
// Using a dedicated transactional email service like SendGrid or Mailgun is highly recommended for production.
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'Outlook365', or custom host
    host: process.env.EMAIL_HOST,       // Required if service is not recognized (e.g., 'smtp.sendgrid.net')
    port: process.env.EMAIL_PORT,       // Often 587 for TLS, 465 for SSL
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address (e.g., grobinson3@gmail.com)
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Route to handle contact form submissions
app.post('/send-email', async (req, res) => {
    // Destructure data from the request body
    const { name, email, message } = req.body;

    // Server-side validation
    // This is crucial for security and preventing malformed requests.
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    // You can add more validation here, e.g., message length, content filtering.

    try {
        // Construct the email options
        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender's name and email from the form
            to: process.env.RECIPIENT_EMAIL, // Your email address, where you want to receive messages
            subject: `Consulting/Employment Inquiry from ${name}`, // Subject line for the email
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            ` // HTML body of the email
        };

        // Send the email using the configured transporter
        await transporter.sendMail(mailOptions);

        // Respond to the client with a success message
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        // Respond to the client with an error message
        res.status(500).json({ error: 'Failed to send message.', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Access the backend at http://localhost:${port}`);
});

