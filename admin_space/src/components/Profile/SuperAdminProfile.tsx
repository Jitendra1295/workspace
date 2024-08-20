import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getSuperAdminProfile } from "../../redux/slices/authSlice";
import toast, { Toaster } from 'react-hot-toast';

interface SuperAdminProfileProps {
    superAdmin: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
        address: string;
        profileImageUrl?: string;
    };
}

const SuperAdminProfile: React.FC = () => {
    const dispatch = useAppDispatch()
    const superAdmin = useAppSelector((state: any) => state.auth.user);
    // const superAdmin = useAppSelector((state) => state.auth);
    console.log("superAdmin::", superAdmin);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("getSuperAdminProfile:0");
                const response = await dispatch(getSuperAdminProfile()).unwrap();
                console.log("getSuperAdminProfile:1", response);
                // Handle profile data
            } catch (error) {
                toast.error('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, [dispatch]);

    const imageUrl = (url: any) => {
        const baseUrl = 'http://localhost:5000';
        console.log("url::", url);

        const imageUrl = url ? `${baseUrl}/${url}` : 'https://picsum.photos/200/300';
        return imageUrl
    }
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
                            <a href="/admin/profile" className="text-blue-600 hover:underline">Profile</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Profile Details</h1>
                </div>
                {superAdmin &&
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={imageUrl(superAdmin.admin.profileImage)}
                                alt="Super Admin Profile"
                                className="w-24 h-24 rounded-full object-cover mr-4"
                            />
                            <h2 className="text-xl font-bold">{superAdmin.admin.name}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-700">Email:</h3>
                                <p className="text-gray-600">{superAdmin.admin.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700">Phone:</h3>
                                <p className="text-gray-600">{superAdmin.admin.phoneNumber}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700">Password:</h3>
                                <p className="text-gray-600">{superAdmin.admin.password}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700">Address:</h3>
                                <p className="text-gray-600">{superAdmin.admin.address}</p>
                            </div>
                        </div>
                    </div>}
            </div>
            <Toaster />
        </div>
    );
};

export default SuperAdminProfile;
