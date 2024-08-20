const Employee = require('../models/employeeModel');
const SuperAdmin = require('../models/superAdminModel');
const Workspace = require("../models/workspaceModel");
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

const createSuperAdmin = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
    console.log("createSuperAdmin::", req.file);

    try {
        let superAdmin = new SuperAdmin({ name, email, password, phoneNumber, address, profileImage: `uploads/${req.file.filename}`, });
        await superAdmin.save();
        res.status(201).json({ message: 'Super Admin created successfully' });
    } catch (error) {
        console.error('Error creating Super Admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSuperAdmin = async (req, res) => {

    console.log("getSuperAdmin::1", req.params.id);
    const admin = await SuperAdmin.findById(req.params.id);
    console.log("getSuperAdmin::2", admin);
    if (admin) {
        res.json({
            admin
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const loginEmployee = async (req, res) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });

    if (employee) {
        res.json({
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            token: generateToken(employee._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
const loginWorkspace = async (req, res) => {
    const { email, password } = req.body;
    console.log("loginWorkspace ::1", email, password);

    const workspace = await Workspace.findOne({ email });


    if (workspace) {
        res.json({
            _id: workspace._id,
            name: workspace.name,
            email: workspace.email,
            role: "WorkspaceAdmin",
            token: generateToken(workspace._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const loginSuperAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const superAdmin = await SuperAdmin.findOne({ email });

        if (superAdmin && (await superAdmin.matchPassword(password))) {
            res.json({
                _id: superAdmin._id,
                email: superAdmin.email,
                role: "SuperAdmin",
                token: generateToken(superAdmin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { loginEmployee, loginSuperAdmin, loginWorkspace, createSuperAdmin, getSuperAdmin };
