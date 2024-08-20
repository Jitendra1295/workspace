const cron = require('node-cron');
const SuperAdmin = require('../models/superAdminModel');
const emailService = require('../services/emailService');

cron.schedule('* * * * *', () => {
    SuperAdmin.find({}).sort({ createdAt: -1 }).limit(1)
        .then(superAdmins => {
            if (superAdmins.length > 0) {
                emailService.sendNotification(superAdmins[0]);
            }
        })
        .catch(error => console.error('Error fetching Super Admin:', error));
});
