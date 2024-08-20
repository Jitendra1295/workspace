import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WorkSpaceSideBar from '../WorkspaceAdmin/WorkSpaceSideBar';
import { Employee } from '../../types/Employee'; // Adjust import path as needed
import { useAppDispatch } from '../../redux/store'; // Use useAppSelector to access state
import { getEmployeeDataById } from "../../redux/slices/employeeSlice";
import EmployeSideBar from '../Common/EmployeSideBar';

const EmployeeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                if (id) {
                    let employee = await dispatch(getEmployeeDataById(id)).unwrap();
                    setEmployee(employee);
                }
            } catch (err) {
                setError('Error fetching employee details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);
    const imageUrl = (url: any) => {
        const baseUrl = 'http://localhost:5000';
        console.log("url::", url);

        const imageUrl = url ? `${baseUrl}/${url}` : 'https://picsum.photos/200/300';
        return imageUrl
    }
    const userType = localStorage.getItem('userType');
    if (loading) return <div className="text-center py-6">Loading...</div>;
    if (error) return <div className="text-center py-6 text-red-500">{error}</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            {userType === "WorkspaceAdmin" ? <WorkSpaceSideBar /> : <EmployeSideBar />}
            <main className="flex-1 p-6 overflow-y-auto">
                {employee ? (
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-center justify-center bg-gray-200 p-6">
                            <img
                                src={imageUrl(employee.profilePicture)}
                                alt={`${employee.name}'s profile`}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Name:</span>
                                    <span className="ml-4">{employee.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Email:</span>
                                    <span className="ml-4">{employee.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Company:</span>
                                    <span className="ml-4">{employee.company}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Department:</span>
                                    <span className="ml-4">{employee.department}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Mobile:</span>
                                    <span className="ml-4">{employee.mobile}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Date of Birth:</span>
                                    <span className="ml-4">{new Date(employee.dob).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Joining Date:</span>
                                    <span className="ml-4">{new Date(employee.joiningDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Address:</span>
                                    <span className="ml-4">{employee.address}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Company Address:</span>
                                    <span className="ml-4">{employee.companyAddress}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Experience:</span>
                                    <span className="ml-4">{employee.experience} years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">No employee data available.</div>
                )}
            </main>
        </div>
    );
};

export default EmployeeDetails;