import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers, addUser, editUser, deleteUserById } from '../store/userSlice';
import { UserCreateInput } from '../types/user.types';

export const useUsers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    const loadUsers = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleAddUser = async (userInput: UserCreateInput) => {
        await dispatch(addUser(userInput));
    };

    const handleUpdateUser = async (id: string, userInput: UserCreateInput) => {
        await dispatch(editUser({ id, user: userInput }));
    };

    const handleDeleteUser = async (id: string) => {
        await dispatch(deleteUserById(id));
    };

    return {
        users,
        loading,
        error,
        addUser: handleAddUser,
        updateUser: handleUpdateUser,
        deleteUser: handleDeleteUser,
        refresh: loadUsers
    };
};
