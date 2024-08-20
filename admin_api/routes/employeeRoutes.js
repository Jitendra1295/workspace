const express = require('express');
const { registerEmployee, updateProfile, getAllEmpList, getEmpDataByID } = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname, '..', 'public', 'uploads');
        console.log(`Saving file to: ${dirPath}`); // Debugging line
        cb(null, dirPath); // Ensure correct path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});
const upload = multer({ storage });
router.post('/register', upload.single('profilePicture'), protect, registerEmployee);
router.put('/profile/:id', upload.single('profilePicture'), protect, updateProfile);
router.get('/getEmployeeData/:id', protect, getAllEmpList);
router.get('/getEmpByID/:id', protect, getEmpDataByID);

module.exports = router;
