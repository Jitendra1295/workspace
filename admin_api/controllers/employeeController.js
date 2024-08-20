const Employee = require('../models/employeeModel');
const deleteFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
const registerEmployee = async (req, res) => {
    const { name, password, company, dob, department, address, experience, companyAddress, mobile, email, userID, joiningDate } = req.body;

    console.log("registerEmployee:1", req.body);

    const employeeExists = await Employee.findOne({ email });

    console.log("registerEmployee:2", userID, req.file);

    const logo = req.file ? req.file.path : null;
    if (employeeExists) {
        res.status(400);
        throw new Error('Employee already exists');
    }
    const employee = await Employee.create({
        name,
        password,
        company,
        dob,
        department,
        mobile,
        companyAddress,
        email,
        experience,
        address,
        profilePicture: `uploads/${req.file.filename}`,
        joiningDate,
        createdBy: userID
    });

    if (employee) {
        res.status(201).json({
            _id: employee._id,
            name: employee.name,
            email: employee.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid employee data');
    }
};

const updateProfile = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        console.log("updateProfile::", employee);

        if (employee) {
            // Update fields if new data is provided
            employee.name = req.body.name || employee.name;
            employee.company = req.body.company || employee.company;
            employee.department = req.body.department || employee.department;
            employee.mobile = req.body.mobile || employee.mobile;
            employee.email = req.body.email || employee.email;
            employee.profilePicture = req.body.profilePicture || employee.profilePicture;
            employee.joiningDate = req.body.joiningDate || employee.joiningDate;
            employee.experience = req.body.experience || employee.experience;  // Handle experience
            employee.address = req.body.address || employee.address;  // Handle address
            employee.companyAddress = req.body.companyAddress || employee.companyAddress;  // Handle company address

            // Save updated employee
            const updatedEmployee = await employee.save();

            res.json({
                _id: updatedEmployee._id,
                name: updatedEmployee.name,
                email: updatedEmployee.email,
            });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// const getAllEmpList = async (req, res) => {
//     try {
//         const { id } = req.params; // Extracting user ID from route params
//         // Logic to find employees based on the user ID
//         const employees = await Employee.find({ createdBy: id }); // Assuming you have a userId field in your Employee schema
//         console.log("getAllEmpList::", employees);

//         if (!employees) {
//             return res.status(404).json({ message: "No employees found for this user." });
//         }

//         res.json(employees);
//     } catch (error) {
//         console.error("Error retrieving employees:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// }

const getAllEmpList = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from route params
        const { search, department, startDate, endDate, page = 1, limit = 10 } = req.query;

        // Build the query object
        let query = { createdBy: id }; // Start with user ID filter

        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search by name
        }
        if (department) {
            query.department = department;
        }
        if (startDate && endDate) {
            query.joiningDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Paginate
        const skip = (page - 1) * limit;
        const employees = await Employee.find(query).skip(skip).limit(parseInt(limit));

        console.log("getAllEmpList::", employees);

        if (!employees.length) {
            return res.status(404).json({ message: "No employees found for this user." });
        }

        res.json(employees);
    } catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getEmpDataByID = async (req, res) => {
    try {
        const { id } = req.params; // Extracting user ID from route params
        console.log("getEmpDataByID::", id);
        // Logic to find employees based on the user ID
        const employees = await Employee.findById(id);
        // await Employee.findById(ObjectId(id));
        console.log("getEmpDataByID::", employees);

        if (!employees) {
            return res.status(404).json({ message: "No employees found for this id." });
        }

        res.json(employees);
    } catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { registerEmployee, updateProfile, getAllEmpList, getEmpDataByID };
