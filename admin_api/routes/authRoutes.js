const express = require('express');
const { loginEmployee, loginSuperAdmin, loginWorkspace, createSuperAdmin, getSuperAdmin } = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
router.post('/login/employee', loginEmployee);
router.post('/login/workspace', loginWorkspace);
router.post('/login/superAdmin', loginSuperAdmin);
router.get('/getSuperAdmin/:id', getSuperAdmin);
router.post('/register/superAdmin', upload.single('profileImage'), createSuperAdmin);

module.exports = router;
