const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createWorkspace, updateWorkspace, deactivateWorkspace, getWorkspaces, getWorkspacesByID } = require('../controllers/workspaceController');
const { protect } = require('../middlewares/authMiddleware');

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

// Routes
router.post('/addWorkspaces', upload.single('logo'), protect, createWorkspace);
router.put('/editWorkspaces/:id', upload.single('logo'), protect, updateWorkspace);
router.delete('/deactivate/:id', protect, deactivateWorkspace);
router.get('/workspaces', protect, getWorkspaces);
router.get('/workspaceById/:id', protect, getWorkspacesByID);

module.exports = router;
