import axios from 'axios';
import { Employee } from '../types/Employee';
import { Workspace } from '../types/Workspace';
import { RegisterPayload } from '../types/RegisterPayload';

const API_URL = 'http://localhost:5000/api'; // Use HTTP if HTTPS is not configured

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Use this if using cookies for authentication
    timeout: 10000, // 10 seconds timeout for requests
});

// Interceptors for request and response
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors
        }
        return Promise.reject(error);
    }
);

// Export individual functions for API calls
export const registerEmployee = (data: any) => api.post('/register', data);
export const loginAPI = (data: any) => api.post('/auth/login/superAdmin', data);
export const loginWorkSpaceAPI = (data: any) => api.post('/auth/login/workspace', data);
export const loginEmployeeAPI = (data: any) => api.post('/auth//login/employee', data);
export const registerAPI = async (formData: FormData): Promise<any> => {
    try {
        console.log("registerSuperAdmin");
        console.log("registerSuperAdmin:1", formData);

        const response = await api.post('/auth/register/superAdmin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error registering Super Admin:', error);
        throw error;
    }
};
export const getProfile = async (): Promise<RegisterPayload> => {
    try {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (!userData) {
            throw new Error("No user data found in local storage.");
        }

        // Parse user data
        const parsedUserData = JSON.parse(userData);
        if (!parsedUserData || !parsedUserData._id) {
            throw new Error("User data is not available or user is not authenticated.");
        }

        console.log("User data:", parsedUserData._id);

        // Make API call to fetch the profile data
        const response = await api.get(`/auth/getSuperAdmin/${parsedUserData._id}`);
        console.log("User data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching super admin profile:", error);
        throw new Error('Failed to fetch super admin profile');
    }
};

export const addWorkspace = (formData: FormData) => api.post('/workspaces', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const createWorkspace = async (formData: FormData): Promise<Workspace> => {
    console.log("createWorkspace");
    console.log("createWorkspace:1", formData);

    const response = await api.post<Workspace>('/workspaces/addWorkspaces', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}
export const updateWorkspace = () => api.get('/profile');
export const fetchAllWorkspacesData = async (): Promise<Workspace[]> => {
    const userData = localStorage.getItem('user');
    const parsedUserData = userData && JSON.parse(userData);

    console.log("User data:2", parsedUserData._id);

    const response = await api.get<Workspace[]>(`/workspaces/workspaces/?userId=${parsedUserData._id}`);
    console.log("User data:3", response);

    return response.data;
};
export const fetchWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
    const response = await api.get<Workspace>(`/workspaces/workspaceById/${workspaceId}`);
    console.log("fetchWorkspaceById::", response);

    return response.data;
};
export const updateWorkspaceData = async (workspaceId: string, workspaceData: FormData): Promise<Workspace> => {
    const response = await api.put<Workspace>(`/workspaces/editWorkspaces/${workspaceId}`, workspaceData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deactivateWorkspaceApi = async (workspaceId: string): Promise<void> => {
    console.log("deactivateWorkspaceApi");

    await api.delete(`/workspaces/deactivate/${workspaceId}`);
};

export const createEmp = async (formData: FormData): Promise<Employee> => {
    try {
        const response = await api.post<Employee>('/employees/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        // Handle error as needed
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'An error occurred');
        }
        throw new Error('An unexpected error occurred');
    }
};

export const fetchEmployeesByUserId = async (query: string = ''): Promise<Employee[]> => {
    try {
        const userData = localStorage.getItem('user');
        const parsedUserData = userData && JSON.parse(userData);

        if (!parsedUserData || !parsedUserData._id) {
            throw new Error("User data is not available or user is not authenticated.");
        }

        console.log("User data:", parsedUserData);

        // Construct the full URL with query parameters
        const url = `/employees/getEmployeeData/${parsedUserData._id}?${query}`;
        const response = await api.get<Employee[]>(url);

        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error; // Handle this error based on your application's needs
    }
};

export const fetchEmployeeByEmpId = async (empId: string): Promise<Employee> => {
    try {
        const response = await api.get<Employee>(`/employees/getEmpByID/${empId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error; // Handle the error as needed
    }
};



export const updateEmpData = async (empId: string, empData: FormData): Promise<Employee> => {
    const response = await api.put<Employee>(`/employees/profile/${empId}`, empData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};





export default api;
