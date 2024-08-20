import React, { useState, useEffect, useRef, useCallback } from 'react';
import WorkSpaceSideBar from './WorkSpaceSideBar';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTimes, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Use useAppSelector to access state
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { Employee } from '../../types/Employee';

const EmployeeList: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [search, setSearch] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const { employees, error } = useAppSelector((state) => state.employee);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Function to fetch employee data
    const fetchEmployeesData = async (page: number) => {
        setLoading(true);
        try {
            const response = await dispatch(fetchEmployees({ page, search, department, dateRange })).unwrap();
            console.log('fetchEmployeesData res::', response);
            toast.success('Employee data loaded successfully!');
        } catch (error) {
            console.error('Error fetching employee data:', error); // Log the error for debugging
            toast.error('Failed to load employee data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeesData(page);
    }, [page, search, department, dateRange]);

    // Export employees to CSV
    const handleExportCSV = () => {
        const csv = Papa.unparse(employees);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'employees.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEdit = (id: any) => {
        navigate(`/workSpace/employee/Edit/${id}`);
    };

    const handleDeactivate = (id: string) => {
        alert(`Deactivate employee with ID: ${id}`);
    };

    const handleView = (id: any) => {
        navigate(`/employee/profile/${id}`);
    };

    const handleAddNewEmployee = () => {
        navigate("/workSpace/employee");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <WorkSpaceSideBar />
            <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Employee List</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 focus:outline-none`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 focus:outline-none`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={handleAddNewEmployee}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                        >
                            Add New Employee
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                        >
                            Export to CSV
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border rounded mr-4"
                    />
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="px-4 py-2 border rounded mr-4"
                    >
                        <option value="">All Departments</option>
                        {/* Add more options based on your departments */}
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Support">Support</option>
                    </select>
                    <input
                        type="date"
                        value={dateRange[0]?.toISOString().split('T')[0] || ''}
                        onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
                        className="px-4 py-2 border rounded mr-4"
                    />
                    <input
                        type="date"
                        value={dateRange[1]?.toISOString().split('T')[0] || ''}
                        onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
                        className="px-4 py-2 border rounded"
                    />
                </div>

                {viewMode === 'list' ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.map((employee: Employee, index: number) => (
                                    <tr key={employee._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleView(employee._id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(employee._id)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeactivate(employee._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                                                >
                                                    Deactivate
                                                </button>
                                                <button
                                                    style={{ height: '40px' }}
                                                    onClick={() => navigate(`/employee/profile/${employee._id}`)}
                                                    className="text-white bg-purple-600 px-3 py-1 rounded-lg hover:bg-purple-700 transition flex items-center"
                                                >
                                                    <FontAwesomeIcon icon={faUnlockAlt} className="mr-1" />

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {employees.map((employee: Employee) => (
                            <div key={employee._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{employee.name}</h3>
                                <p className="text-sm text-gray-600"><strong>Department:</strong> {employee?.department}</p>
                                <p className="text-sm text-gray-600"><strong>Email:</strong> {employee.email}</p>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => handleView(employee._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(employee._id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeactivate(employee._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Toaster />
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default EmployeeList;
