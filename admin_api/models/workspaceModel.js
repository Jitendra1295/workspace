const mongoose = require('mongoose');

const workspaceSchema = mongoose.Schema({
    logo: { type: String },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that email addresses are unique
    },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperAdmin' },
}, { timestamps: true }); // Add this option to enable timestamps

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
