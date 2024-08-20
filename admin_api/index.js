const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const path = require("path")
dotenv.config();
require('./cron/notificationCron');

connectDB();

const app = express();


// Use CORS middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve("./public")));

console.log("1");

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/workspaces', workspaceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
