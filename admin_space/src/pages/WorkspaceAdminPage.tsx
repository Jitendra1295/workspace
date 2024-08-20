import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../redux/store';
import { createNewWorkspace, updateExistingWorkspace, fetchWorkspace } from "../redux/slices/workspaceSlice";

interface WorkspaceFormInputs {
    logo: FileList; // Handle file uploads
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
}

const AddWorkspace: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<WorkspaceFormInputs>();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id, action } = useParams<{ id: string, action: string }>();

    useEffect(() => {
        console.log("useEffect::", action, id);

        if (id) {
            // Fetch workspace details if editing
            const fetchWorkspaceData = async () => {
                console.log("useEffect::1", action, id);
                try {
                    const workspace = await dispatch(fetchWorkspace(id)).unwrap();
                    console.log("useEffect::2", workspace);
                    // Populate the form fields with existing data
                    setValue("name", workspace.name);
                    setValue("email", workspace.email);
                    setValue("phone", workspace.phoneNumber);
                    // setValue("password", workspace.password);
                    setValue("address", workspace.address);
                    setLogoPreview(workspace.logo); // Assuming workspace logo is a URL or base64 string
                } catch (error) {
                    console.log("useEffect::3", error);
                    toast.error("Failed to fetch workspace details.");
                }
            };

            fetchWorkspaceData();
        }
    }, [action, id, dispatch, setValue]);

    const onSubmit = async (data: WorkspaceFormInputs) => {
        const userData = localStorage.getItem('user');
        const parsedUserData = userData && JSON.parse(userData);
        const formData = new FormData();
        formData.append('logo', data.logo[0]); // Assuming single file upload
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        formData.append('address', data.address);
        formData.append('userID', parsedUserData._id);

        try {
            if (action === "Edit" && id) {
                // Update existing workspace
                await dispatch(updateExistingWorkspace({ workspaceId: id, workspaceData: formData })).unwrap();
                toast.success('Workspace updated successfully!');
            } else {
                // Create a new workspace
                await dispatch(createNewWorkspace(formData)).unwrap();
                toast.success('Workspace added successfully!');
            }
            navigate('/admin/dashboard'); // Redirect after success
        } catch (error) {
            toast.error(`Failed to ${action === "edit" ? "update" : "add"} workspace.`);
        }
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 font-bold text-xl">Dashboard</div>
                <nav className="flex-1">
                    <ul>
                        <li className="p-4 hover:bg-gray-700"><a href="/admin/dashboard" className="text-blue-600 hover:underline">Home</a></li>
                        <li className="p-4 hover:bg-gray-700"><a href="/profile" className="text-blue-600 hover:underline">Profile</a></li>
                    </ul>
                </nav>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg p-6 w-full ml-9 md:w-1/2 lg:w-1/3 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center">
                    {action === "Edit" ? "Edit Workspace" : action === "view" ? "View Workspace" : "Add New Workspace"}
                </h2>

                {/* Logo Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('logo', { required: action !== "Edit" })}
                        onChange={handleLogoChange}
                    />
                    {/* {logoPreview && (
                        <img
                            src={`http://localhost:5000/uploads/${logoPreview}`}
                            width={100}
                            height={70}
                            alt="Logo Preview"
                            className="mt-4 w-24 h-24 rounded-full object-cover"
                        />
                    )} */}
                    {errors.logo && <span className="text-red-500 text-sm">Logo is required</span>}
                </div>

                {/* Name Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Workspace Name"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Workspace Email"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>

                {/* Phone Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('phone', { required: true })}
                    />
                    {errors.phone && <span className="text-red-500 text-sm">Phone number is required</span>}
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('password', { required: action !== "Edit" })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                </div>

                {/* Address Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                        type="text"
                        placeholder="Workspace Address"
                        className="block w-full text-gray-700 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register('address', { required: true })}
                    />
                    {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        {action === "edit" ? "Update Workspace" : "Add Workspace"}
                    </button>
                </div>

            </form>
            <Toaster />
        </div>
    );
};

export default AddWorkspace;
