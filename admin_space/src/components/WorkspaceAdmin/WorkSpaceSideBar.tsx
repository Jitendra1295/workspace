import React from 'react';
import { NavLink } from 'react-router-dom';

const WorkSpaceSideBar: React.FC = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 font-bold text-xl">Dashboard</div>
            <nav className="flex-1">
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <NavLink
                            to="/workSpace/dashboard"
                            className="text-blue-600 hover:underline"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <NavLink
                            to="/workSpace/empList"
                            className="text-blue-600 hover:underline"
                        >
                            Employee List
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default WorkSpaceSideBar;
