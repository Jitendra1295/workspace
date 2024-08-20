import React from 'react';
import WorkSpaceSideBar from '../WorkspaceAdmin/WorkSpaceSideBar';

interface Department {
    name: string;
    employees: number;
}

interface WorkspaceAdmin {
    name: string;
    email: string;
}

interface WorkspaceDataType {
    name: string;
    location: string;
    employeeCount: number;
    activeProjects: number;
    totalRevenue: string;
    departments: Department[];
    createdAt: string;
    workspaceAdmin: WorkspaceAdmin;
}

const WorkspaceData: React.FC = () => {
    // Dummy data for the workspace
    const workspaceData: WorkspaceDataType = {
        name: "Tech Innovators Inc.",
        location: "San Francisco, CA",
        employeeCount: 150,
        activeProjects: 12,
        totalRevenue: "$1.2M",
        departments: [
            { name: "Engineering", employees: 60 },
            { name: "Sales", employees: 30 },
            { name: "Marketing", employees: 25 },
            { name: "HR", employees: 10 },
            { name: "Finance", employees: 15 },
            { name: "Support", employees: 10 }
        ],
        createdAt: "January 10, 2020",
        workspaceAdmin: {
            name: "Jane Doe",
            email: "jane.doe@techinnovators.com"
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <WorkSpaceSideBar />
            <div className="flex-1 p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Workspace Details</h1>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Name:</strong> {workspaceData.name}</p>
                            <p><strong>Location:</strong> {workspaceData.location}</p>
                            <p><strong>Employee Count:</strong> {workspaceData.employeeCount}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Active Projects:</strong> {workspaceData.activeProjects}</p>
                            <p><strong>Total Revenue:</strong> {workspaceData.totalRevenue}</p>
                            <p><strong>Created At:</strong> {workspaceData.createdAt}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Departments</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {workspaceData.departments.map((dept, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.employees}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WorkspaceData;
