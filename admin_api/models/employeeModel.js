const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    company: { type: String, required: true },
    dob: { type: Date, required: true },
    department: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    companyAddress: { type: String, required: true },
    experience: { type: String, required: true },
    address: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
}, { timestamps: true });

employeeSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
