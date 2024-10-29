// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// const cors = require('cors');
app.use(cors({
    origin: '*', // Add the Vercel frontend URL here
    methods: 'GET,POST',
}));
app.use(express.json());


const uri = 'mongodb+srv://blank:Astro_13@cluster0.h3zj1.mongodb.net/'; // Enter your cluster login url
const client = new MongoClient(uri);


////////////////////////////////
//////function implementation///
////////////////////////////////
// Elastic Email SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com', // Elastic Email SMTP server
    port: 2525, // or 587
    auth: {
        user: process.env.EMAIL_USER, // Replace with your Elastic Email username
        pass: process.env.EMAIL_PASS, // Replace with your Elastic Email password
    },
    debug: true,
});

async function sendMessage(req, res) {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: '', // Sender's email address
        to: '',   // The same email address
        subject: subject,
        html: `
            <p>From: ${name}</p>
            <p>Email: ${email}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `,
    };
    
    try {
        res.status(200);
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error.message); // Log error message
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }    
}

async function fetchProjects(req, res) {
    try {
        await client.connect();
        const database = client.db('Projects');
        const collection = database.collection('Projects');
        const projects = await collection.find({}).toArray();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'An error occurred while fetching projects' });
    }
}


// Api routes setup 
app.get('/api/projects', fetchProjects);
app.post('/api/contact', sendMessage);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});
// Serve the React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });



app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
});
