import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workspaceSlice from './slices/workspaceSlice';
import employeeSlice from './slices/employeeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        workspace: workspaceSlice,
        employee: employeeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed versions of the useSelector and useDispatch hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
