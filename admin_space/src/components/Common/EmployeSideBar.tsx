import React from 'react';
import { NavLink } from 'react-router-dom';

const EmpSideBar: React.FC = () => {
    const userData = localStorage.getItem('user');
    const parsedUserData = userData && JSON.parse(userData);

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 font-bold text-xl">Dashboard</div>
            <nav className="flex-1">
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <NavLink
                            to="/emp/dashboard"
                            className="text-blue-600 hover:underline"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <NavLink
                            to={`/employee/profile/${parsedUserData._id}`}
                            className="text-blue-600 hover:underline"
                        >
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default EmpSideBar;
