import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createEmp, fetchEmployeesByUserId, fetchEmployeeByEmpId, updateEmpData } from '../../api/api';
import { Employee } from '../../types/Employee';
interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

interface FetchEmployeesParams {
    page: number;
    search?: string;
    department?: string;
    dateRange?: [Date | null, Date | null];
}

// Async Thunks
export const fetchEmployees = createAsyncThunk<Employee[], FetchEmployeesParams>(
    'employees/fetchEmployees',
    async ({ page, search, department, dateRange }) => {
        // Construct the query parameters based on filters
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (department) queryParams.append('department', department);
        if (dateRange && dateRange[0]) queryParams.append('startDate', dateRange[0].toISOString());
        if (dateRange && dateRange[1]) queryParams.append('endDate', dateRange[1].toISOString());
        queryParams.append('page', page.toString());
        console.log("fetchEmployees::", queryParams.toString());

        // Fetch employees with filter parameters
        const response = await fetchEmployeesByUserId(queryParams.toString());
        console.log("fetchEmployeesData res::2", response);
        return response;
    }
);
export const getEmployeeDataById = createAsyncThunk(
    'employees/getEmployeeById',
    async (empId: string, { rejectWithValue }) => {
        try {
            // Make API call to get the employee data by ID
            const response = await fetchEmployeeByEmpId(empId);
            return response; // Assuming response has data property
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred while fetching the employee data.');
        }
    }
);
export const addEmployee = createAsyncThunk<Employee, FormData, { rejectValue: string }>(
    'employees/addEmployee',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await createEmp(formData);
            // Ensure the response is of type Employee
            return response as Employee;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Extract the error message from AxiosError
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            }
            // Handle other types of errors
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const updateEmployee = createAsyncThunk<Employee, { empId: string; formData: FormData }, { rejectValue: string }>(
    'employees/updateEmployee',
    async ({ empId, formData }, { rejectWithValue }) => {
        try {
            const response = await updateEmpData(empId, formData)
            console.log("updateEmployee::", response);

            // Ensure the response is of type Employee
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Extract the error message from AxiosError
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            }
            // Handle other types of errors
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const editEmployee = createAsyncThunk('employees/editEmployee', async (updatedEmployee: Employee) => {
    // const response = await axios.put<Employee>(`/api/employees/${updatedEmployee.id}`, updatedEmployee);
    // return response.data;
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (id: string) => {
    await axios.delete(`/api/employees/${id}`);
    return id;
});

// Slice
const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Employees
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.employees = action.payload;

                state.loading = false;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch employees';
            })
            .addCase(getEmployeeDataById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployeeDataById.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.employees.push(action.payload);
                state.loading = false;
            })
            .addCase(getEmployeeDataById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add employee';
            })
            // Add Employee
            .addCase(addEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.employees.push(action.payload);
                state.loading = false;
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add employee';
            })
            // Edit Employee
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to edit employee';
            })
            // Remove Employee
            .addCase(removeEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(removeEmployee.fulfilled, (state, action: PayloadAction<string>) => {
            //     state.employees = state.employees.filter(emp => emp.id !== action.payload);
            //     state.loading = false;
            // })
            .addCase(removeEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove employee';
            });
    },
});

export default employeeSlice.reducer;
