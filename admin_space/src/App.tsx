import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import RegisterEmployee from './components/Auth/RegisterEmployee';
import AccessDenied from './pages/AccessDenied';
import NotFound from './pages/NotFound';
import Navbar from './components/Common/Navbar';
import AdminDashboard from './components/dashboard/AdminDashboard';
import WorkSpaceDashboard from './components/dashboard/WorkSpaceDashboard';
import EmpDashboard from './components/dashboard/EmpDashboard';
import WorkspaceView from './pages/WorkspaceAdminPage';
import WorkspaceViewDetails from './pages/WorkspaceViewDetails';
import EmployeeList from './components/WorkspaceAdmin/EmployeeList';
import EmployeeManagement from './components/WorkspaceAdmin/EmployeeManagement';
import EmployeeProfile from './components/Profile/EmployeeProfile';
import SuperAdminProfile from './components/Profile/SuperAdminProfile';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App: React.FC = () => {
  // const user = useAppSelector((state) => state.auth.user);

  return (
    <Router>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={true ? <Profile /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterEmployee />} />

          <Route element={<ProtectedRoute roles={['SuperAdmin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<SuperAdminProfile />} />
            <Route path="/workspace" element={<WorkspaceView />} />
          </Route>

          <Route element={<ProtectedRoute roles={['SuperAdmin', "WorkspaceAdmin"]} />}>
            <Route path="/workSpace/dashboard" element={<WorkSpaceDashboard />} />
            <Route path="/workspaceDetails" element={<WorkspaceViewDetails />} />
            <Route path="/workSpace/empList" element={<EmployeeList />} />
            <Route path="/workSpace/employee" element={<EmployeeManagement />} />
            <Route path="/workSpace/employee/:action/:id" element={<EmployeeManagement />} />
            <Route path="/workspace/:action/:id" element={<WorkspaceView />} />
          </Route>

          <Route path="/emp/dashboard" element={<EmpDashboard />} />
          <Route path="/employee/profile/:id" element={<EmployeeProfile />} />

          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
