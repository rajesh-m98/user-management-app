import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserCreateInput } from '../types/user.types';
import { userService } from '../services/userService';
import { toast } from 'react-hot-toast';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await userService.getUsers();
});

export const addUser = createAsyncThunk(
    'users/addUser',
    async (userInput: UserCreateInput, { rejectWithValue }) => {
        try {
            return await userService.createUser(userInput);
        } catch (err) {
            return rejectWithValue('Failed to add user');
        }
    }
);

export const editUser = createAsyncThunk(
    'users/editUser',
    async ({ id, user }: { id: string; user: UserCreateInput }, { rejectWithValue }) => {
        try {
            return await userService.updateUser(id, user);
        } catch (err) {
            return rejectWithValue('Failed to update user');
        }
    }
);

export const deleteUserById = createAsyncThunk(
    'users/deleteUser',
    async (id: string, { rejectWithValue }) => {
        try {
            await userService.deleteUser(id);
            return id;
        } catch (err) {
            return rejectWithValue('Failed to delete user');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch users';
            })
            // Add User
            .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.unshift(action.payload);
                toast.success('User added successfully');
            })
            // Edit User
            .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                toast.success('User updated successfully');
            })
            // Delete User
            .addCase(deleteUserById.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
                toast.success('User deleted successfully');
            });
    },
});

export default userSlice.reducer;
