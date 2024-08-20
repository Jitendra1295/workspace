import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Use useAppSelector to access state
import toast, { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import WorkSpaceSideBar from './WorkSpaceSideBar';
import { addEmployee, getEmployeeDataById, updateEmployee } from "../../redux/slices/employeeSlice";
import { Employee } from '../../types/Employee';

// interface EmployeeFormInputs {
//     name: string;
//     email: string;
//     Dob: string; // Changed to 'string'
//     joiningDate: string; // Changed to 'string'
//     mobile: string;
//     Department: string;
//     address: string;
//     companyName: string;
//     password: string;
//     profilePicture: FileList;
//     companyAddress: string;
//     experience: string;
// }


const EmployeeManagement: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Employee>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id, action } = useParams<{ id: string, action: string }>();

    useEffect(() => {
        console.log("useEffect::", action, id);

        if (action === "Edit" && id) {
            // Fetch employee details if editing
            const fetchEmployeeData = async () => {
                console.log("useEffect::1", action, id);
                try {
                    let employee = await dispatch(getEmployeeDataById(id)).unwrap();
                    console.log("useEffect::2", employee);
                    // Populate the form fields with existing data
                    setValue("name", employee.name);
                    setValue("email", employee.email);
                    setValue("dob", new Date(employee.dob).toISOString().split('T')[0]); // Format to YYYY-MM-DD
                    setValue("joiningDate", new Date(employee.joiningDate).toISOString().split('T')[0]); // Format to YYYY-MM-DD
                    setValue("mobile", employee.mobile);
                    setValue("department", employee.department);
                    setValue("address", employee.address);
                    setValue("company", employee.company);
                    setValue("password", employee.password);
                    // setValue("profilePicture", employee.profilePicture); // Assuming you're handling this appropriately
                    setValue("companyAddress", employee.companyAddress);
                    setValue("experience", employee.experience);
                } catch (error) {
                    console.log("useEffect::3", error);
                    toast.error("Failed to fetch employee details.");
                }
            };

            fetchEmployeeData();
        }
    }, [action, id, dispatch, setValue]);

    const onSubmit: SubmitHandler<Employee> = async (data) => {
        const userData = localStorage.getItem('user');
        const parsedUserData = userData && JSON.parse(userData);
        const formData = new FormData();
        formData.append('profilePicture', data.profilePicture[0]); // Single file upload
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('password', data.password);
        formData.append('address', data.address);
        formData.append('company', data.company); // Updated field names
        formData.append('dob', data.dob);
        formData.append('joiningDate', data.joiningDate);
        formData.append('department', data.department);
        formData.append('companyAddress', data.companyAddress);
        formData.append('experience', data.experience);
        formData.append('userID', parsedUserData._id);

        try {
            if (action === "Edit" && id) {
                await dispatch(updateEmployee({ empId: id, formData })).unwrap();
                toast.success('Employee added successfully!');
                navigate('/workSpace/empList'); // Redirect after success
            } else {
                await dispatch(addEmployee(formData)).unwrap();
                toast.success('Employee added successfully!');
                navigate('/workSpace/empList'); // Redirect after success
            }

        } catch (error) {
            console.log("error :::", error);
            toast.error(`Failed to.`);
        }

    };

    return (
        <div className="flex h-screen">
            <WorkSpaceSideBar />
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    {action === "Edit" ? "Edit Employee" : "Add New Employee"}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700"> Profile Picture</label>
                            <input
                                type="file"
                                {...register('profilePicture', { required: action !== "Edit" })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.profilePicture && <p className="text-red-500 text-sm">{'Profile Picture is required'}</p>}
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                {...register('mobile', { required: 'Phone number is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                {...register('company', { required: 'Company name is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select
                                {...register('department', { required: 'Department is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Support">Support</option>
                            </select>
                            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700"> Dob</label>
                            <input
                                type="date"
                                {...register('dob', { required: ' Dob is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700"> Joining Date</label>
                            <input
                                type="date"
                                {...register('joiningDate', { required: ' Joining Date is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                {...register('address', { required: 'Address is required' })}
                                rows={4}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Address</label>
                            <textarea
                                {...register('companyAddress', { required: 'Company address is required' })}
                                rows={4}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress.message}</p>}
                        </div>
                        <div >
                            <label className="block text-sm font-medium text-gray-700">Experience</label>
                            <input
                                type="text"
                                {...register('experience', { required: 'Experience is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="text"
                                {...register('password', { required: 'Password is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default EmployeeManagement;
