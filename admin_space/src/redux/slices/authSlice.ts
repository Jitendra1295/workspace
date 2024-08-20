import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, loginWorkSpaceAPI, loginEmployeeAPI, getProfile as getProfileAPI, registerAPI } from '../../api/api';

interface AuthState {
    user: null | any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | string;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};


export const registerSuperAdmin = createAsyncThunk(
    '/auth/register/superAdmin',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await registerAPI(formData); // Call your API for registration
            const userData = response.data; // Ensure this matches the response structure
            console.log('registerSuperAdmin userData:', userData);

            // Optionally, you can save user data to local storage or session storage
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);
// Use the imported `loginAPI` function for the login thunk
export const login = createAsyncThunk('/auth/login/superAdmin', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await loginAPI(credentials);
        const userData = response.data;
        console.log("userData :", userData);

        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        return userData;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const loginWorkSpace = createAsyncThunk('/auth/login/workspace', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await loginWorkSpaceAPI(credentials);
        const userData = response.data;
        console.log("userData :", userData);

        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token)
        return userData;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const loginEmployee = createAsyncThunk('/auth/login/employee', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await loginEmployeeAPI(credentials);
        const userData = response.data;
        console.log("userData :", userData);

        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        return userData;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});


// Use the imported `getProfileAPI` function for the getProfile thunk
export const getSuperAdminProfile = createAsyncThunk(
    'auth/getSuperAdminProfile',
    async (_, { rejectWithValue }) => {
        try {
            console.log("getProfileAPI:0");
            const response = await getProfileAPI(); // Make sure to call the correct API
            console.log("getProfileAPI:1", response);

            return response; // Assuming the response contains the data in the `data` field
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch super admin profile');
        }
    }
);
export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
    const response = await getProfileAPI();
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(loginWorkSpace.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginWorkSpace.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginWorkSpace.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(loginEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getSuperAdminProfile.pending, (state) => {
                state.error = null;
            })
            .addCase(getSuperAdminProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getSuperAdminProfile.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
