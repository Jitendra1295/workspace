const Workspace = require('../models/workspaceModel');
const path = require('path');
const fs = require('fs');

// Helper function to handle file deletion
const deleteFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// Create a new workspace
const createWorkspace = async (req, res) => {
    console.log("createWorkspace::", req.file);

    const { name, email, phone, password, userID, address } = req.body;
    console.log("createWorkspace::1", req.file);
    try {
        const workspace = await Workspace.create({
            logo: `uploads/${req.file.filename}`,
            name,
            email,
            phoneNumber: phone,
            password,
            address,
            createdBy: userID,
        });
        console.log("createWorkspace::1", workspace);
        res.status(201).json(workspace);
    } catch (error) {
        console.log("createWorkspace fail:", error);

        // Optionally delete the file if workspace creation fails
        if (logo) deleteFile(logo);
        res.status(400);
        throw new Error('Invalid workspace data');
    }
};

// Update an existing workspace
const updateWorkspace = async (req, res) => {
    const workspace = await Workspace.findById(req.params.id);

    if (workspace) {
        workspace.logo = req.file ? `uploads/${req.file.filename}` : workspace.logo;
        workspace.name = req.body.name || workspace.name;
        workspace.email = req.body.email || workspace.email;
        workspace.phoneNumber = req.body.phoneNumber || workspace.phoneNumber;
        workspace.address = req.body.address || workspace.address;

        const updatedWorkspace = await workspace.save();
        res.json(updatedWorkspace);
    } else {
        res.status(404);
        throw new Error('Workspace not found');
    }
};

// Deactivate a workspace
const deactivateWorkspace = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id);
        console.log("deactivateWorkspace ::1", workspace);

        if (workspace) {
            await Workspace.deleteOne({ _id: req.params.id }); // Delete the workspace
            console.log("deactivateWorkspace ::2");
            res.json({ message: 'Workspace deleted' });
        } else {
            console.log("deactivateWorkspace ::3");
            res.status(404).json({ message: 'Workspace not found' });
        }
    } catch (error) {
        console.log("deactivateWorkspace ::4", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all workspaces for the current user
const getWorkspaces = async (req, res) => {
    try {
        console.log("getWorkspaces ::1", req.query.userId);

        // Fetch workspaces created by the user
        const workspaces = await Workspace.find({ createdBy: req.query.userId });
        console.log("getWorkspaces ::2", workspaces, req.query.userId);

        // Send response with status 200
        res.status(200).json(workspaces);
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        // Send error response with status 500
        res.status(500).json({ message: 'Failed to fetch workspaces' });
    }
};

const getWorkspacesByID = async (req, res) => {
    try {
        const { id } = req.params; // Extract workspace ID from request parameters

        // Fetch workspace by ID
        const workspace = await Workspace.findById(id);

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        console.log("getWorkspacesByID ::", workspace, id);

        // Send response with status 200
        res.status(200).json(workspace);
    } catch (error) {
        console.error('Error fetching workspace:', error);
        // Send error response with status 500
        res.status(500).json({ message: 'Failed to fetch workspace' });
    }
};




module.exports = { createWorkspace, updateWorkspace, deactivateWorkspace, getWorkspaces, getWorkspacesByID };
