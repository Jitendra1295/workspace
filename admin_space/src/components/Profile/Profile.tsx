import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
// import { getProfile } from '../../redux/slices/authSlice'; // Ensure you import from the correct slice
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const workspace = {
        logo: '/path-to-logo/logo.png', // Replace with the actual logo path
        name: 'Awesome Workspace',
        email: 'contact@workspace.com',
        phone: '+1234567890',
        password: '••••••••', // Usually, passwords would be masked or not shown at all
        address: '123 Workspace St, City, Country',
    };
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // const response = await dispatch(getProfile()).unwrap();
                // console.log(response);

                // Handle profile data
            } catch (error) {
                toast.error('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, [dispatch]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 font-bold text-xl">Dashboard</div>
                <nav className="flex-1">
                    <ul>
                        <li className="p-4 hover:bg-gray-700">
                            <a href="/admin/dashboard" className="text-blue-600 hover:underline">Home</a>
                        </li>
                        <li className="p-4 hover:bg-gray-700">
                            <a href="/profile" className="text-blue-600 hover:underline">Profile</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Profile Details</h1>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <img src={"https://picsum.photos/200/300"} alt="Workspace Logo" className="w-24 h-24 rounded-full object-cover mr-4" />
                        <h2 className="text-xl font-bold">{workspace.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-700">Email:</h3>
                            <p className="text-gray-600">{workspace.email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Phone:</h3>
                            <p className="text-gray-600">{workspace.phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Password:</h3>
                            <p className="text-gray-600">{workspace.password}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Address:</h3>
                            <p className="text-gray-600">{workspace.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Profile;
