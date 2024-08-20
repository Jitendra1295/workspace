import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    // loginWorkspaceAdmin,
    // loginSuperAdmin,
    createWorkspace,
    updateWorkspace,
    // deactivateWorkspace,
    fetchAllWorkspacesData,
    fetchWorkspaceById,
    updateWorkspaceData,
    deactivateWorkspaceApi
} from '../../api/api';

interface Workspace {
    _id: string;
    logo: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}

interface WorkspaceState {
    workspaces: Workspace[];
    loading: boolean,
    currentWorkspace: Workspace | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: WorkspaceState = {
    workspaces: [],
    loading: false,
    currentWorkspace: null,
    status: 'idle',
    error: null,
};

export const fetchAllWorkspaces = createAsyncThunk<Workspace[], void>(
    'workspace/fetchAllWorkspaces',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchAllWorkspacesData();
            console.log("fetchAllWorkspacesData::", response);

            return response;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while fetching the workspaces.');
        }
    }
);

export const fetchWorkspace = createAsyncThunk<Workspace, string>(
    'workspace/fetchWorkspaceById',
    async (workspaceId, { rejectWithValue }) => {
        try {
            const response = await fetchWorkspaceById(workspaceId);
            console.log("fetchWorkspaceById::", response);

            return response;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while fetching the workspace.');
        }
    }
);

export const createNewWorkspace = createAsyncThunk<Workspace, FormData>(
    'workspace/createNewWorkspace',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await createWorkspace(formData);
            return response; // Return the workspace data
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while creating the workspace.');
        }
    }
);

export const updateExistingWorkspace = createAsyncThunk(
    'workspace/updateExistingWorkspace',
    async ({ workspaceId, workspaceData }: { workspaceId: string; workspaceData: FormData }, { rejectWithValue }) => {
        try {
            // Make API call to update the workspace
            const response = await updateWorkspaceData(workspaceId, workspaceData)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred while updating the workspace.');
        }
    }
);



export const deactivateWorkspace = createAsyncThunk(
    'workspace/deactivateWorkspace',
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            await deactivateWorkspaceApi(workspaceId);
            return workspaceId; // Return workspaceId to update the state
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred while deactivating the workspace.');
        }
    }
);

// Slice
const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
            state.workspaces = action.payload;
        },
        setCurrentWorkspace: (state, action: PayloadAction<Workspace | null>) => {
            state.currentWorkspace = action.payload;
        },
        logout: (state) => {
            state.currentWorkspace = null;
            state.workspaces = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkspace.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWorkspace.fulfilled, (state, action: PayloadAction<Workspace>) => {
                state.currentWorkspace = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchWorkspace.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchAllWorkspaces.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllWorkspaces.fulfilled, (state, action: PayloadAction<Workspace[]>) => {
                state.loading = false;
                state.workspaces = action.payload;
            })
            .addCase(fetchAllWorkspaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createNewWorkspace.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewWorkspace.fulfilled, (state, action) => {
                state.workspaces.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(createNewWorkspace.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateExistingWorkspace.pending, (state) => {
                state.status = 'loading';
            })
        // .addCase(updateExistingWorkspace.fulfilled, (state, action) => {
        //     const index = state.workspaces.findIndex(w => w.id === action.payload.id);
        //     if (index !== -1) {
        //         state.workspaces[index] = action.payload;
        //     }
        //     state.status = 'succeeded';
        // })
        // .addCase(updateExistingWorkspace.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload as string;
        // })
        // .addCase(deactivateWorkspace.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(deactivateWorkspace.fulfilled, (state, action) => {
        //     state.workspaces = state.workspaces.filter(w => w.id !== action.payload.id);
        //     state.status = 'succeeded';
        // })
        // .addCase(deactivateWorkspace.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload as string;
        // });
    },
});

export const { setWorkspaces, setCurrentWorkspace, logout } = workspaceSlice.actions;
export default workspaceSlice.reducer;
