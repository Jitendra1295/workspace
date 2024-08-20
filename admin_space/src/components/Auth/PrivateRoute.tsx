import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface PrivateRouteProps {
    element: React.ReactElement;
    requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
    const user = useAppSelector((state) => state.auth.user);
    const location = useLocation();

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect to access denied page if user doesn't have the required role
        return <Navigate to="/access-denied" replace />;
    }

    return element;
};

export default PrivateRoute;
