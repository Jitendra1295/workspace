import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const userData = localStorage.getItem('user');

    let parsedUserData = null;

    if (userData) {
        try {
            parsedUserData = JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            // Handle the error, e.g., clear the invalid data
            localStorage.removeItem('user');
        }
    }

    console.log(parsedUserData);

    const isLoginUser = parsedUserData && parsedUserData._id ? true : false
    const navigate = useNavigate()
    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Redirect to login page
        navigate('/');
    };
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto  flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Admin space</Link>
                <div className="mr-8">
                    {isLoginUser ?
                        <Link to="/" onClick={() => { handleLogout() }} className="mr-4">Logout</Link>
                        :
                        <div>
                            <Link to="/login" className="mr-4">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
