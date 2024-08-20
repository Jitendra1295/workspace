
# Admin Space MERN Stack Application

## Overview
This project is a MERN stack application designed to manage multiple admin roles, including Super Admin, Workspace Admin, and Employee. It supports features like authentication, profile management, and automated notifications via cron jobs.

## Project Structure
- **config/**: Contains database configuration.
- **controllers/**: Handles request and response logic for different admin roles.
- **cron/**: Contains cron jobs for automating tasks like sending notifications.
- **models/**: Mongoose schemas for the database.
- **routes/**: Defines API endpoints.
- **services/**: Reusable business logic such as sending emails.
- **uploads/**: Stores uploaded files like profile pictures.
- **middlewares/**: Middleware functions for authentication and role-based access control.
- **utils/**: Helper functions used across the application.
- **app.js**: Main entry point for the application.
- **.env**: Environment variables.

## Prerequisites
- **Node.js**: v14.x or higher
- **MongoDB**: v4.x or higher
- **NPM**: v6.x or higher (comes with Node.js)
- **Git**: Latest version (optional)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/admin-space.git
   cd admin-space
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

   ```bash
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Start MongoDB:**
   - Make sure MongoDB is running locally or adjust the `MONGODB_URI` in your `.env` file for a remote MongoDB instance.

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

   This command will start the Express server. The cron jobs will also start automatically and run according to their schedules.

2. **Access the API:**
   - Open your browser and navigate to `http://localhost:5000/api/super-admin`.
   - You can replace `/super-admin` with `/workspace-admin` or `/employee` to access different routes.

## Available Routes

- **Super Admin:**
  - `POST /api/super-admin`: Create a new Super Admin.
  - `GET /api/super-admin/:id`: Get Super Admin details.
  - `PUT /api/super-admin/:id`: Update Super Admin details.
  - `DELETE /api/super-admin/:id`: Delete a Super Admin.

- **Workspace Admin:**
  - Similar routes for Workspace Admins.

- **Employee:**
  - Similar routes for Employees.

## Cron Jobs

- **Notification Cron Job:**
  - The `notificationCron.js` file in the `cron/` folder is responsible for sending email notifications when a Super Admin is created.
  - The job is scheduled to run every minute.

## License
This project is licensed under the MIT License.
