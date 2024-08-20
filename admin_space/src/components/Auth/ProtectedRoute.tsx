import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/store'; // Adjust the path as needed

const ProtectedRoute: React.FC<{ roles: string[] }> = ({ roles }) => {
    const userData = localStorage.getItem('user');
    const user = userData && JSON.parse(userData);

    console.log("User data:", user);

    if (!user) {
        // Redirect to login if no user is authenticated
        return <Navigate to="/login" />;
    }

    if (!roles.includes(user.role)) {
        // Redirect to a forbidden page or home if the user does not have the required role
        return <Navigate to="/access-denied" />;
    }

    // Render the child components if the user is authorized
    return <Outlet />;
};

export default ProtectedRoute;
