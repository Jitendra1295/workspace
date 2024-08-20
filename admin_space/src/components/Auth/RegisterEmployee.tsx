import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { registerSuperAdmin } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Use useAppSelector to access state
import { RegisterPayload } from '../../types/RegisterPayload';
const SuperAdminRegister: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterPayload>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('phoneNumber', data.phoneNumber || '');
            formData.append('address', data.address || '');
            if (data.profileImage) {
                formData.append('profileImage', data.profileImage[0]);
            }

            // Dispatch the async thunk
            await dispatch(registerSuperAdmin(formData)).unwrap();

            toast.success('Super Admin registered successfully!');
            navigate('/login'); // Redirect to login or another page after successful registration
        } catch (error) {
            console.error('Error registering super admin:', error);
            toast.error('Failed to register super admin.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-3/5 max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Super Admin Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('profileImage')}
                            onChange={handleImageChange}
                            className="mt-1 block w-full"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Profile Preview" className="mt-2 w-40 h-40 object-cover rounded-full" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            {...register('phoneNumber')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            {...register('address')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-md ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'} focus:outline-none`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default SuperAdminRegister;
