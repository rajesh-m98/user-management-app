import { useState, useEffect, useCallback } from 'react';
import { User, UserCreateInput } from '../types/user.types';
import { userService } from '../services/userService';
import { toast } from 'react-hot-toast';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const addUser = async (userInput: UserCreateInput) => {
        const tempId = Date.now().toString();
        const newUser: User = { ...userInput, id: tempId };

        // Optimistic UI Update
        setUsers((prev) => [newUser, ...prev]);

        try {
            const createdUser = await userService.createUser(userInput);
            // Replace optimistic user with real one from server (though mock API returns dummy id)
            setUsers((prev) => prev.map(u => u.id === tempId ? createdUser : u));
            toast.success('User created successfully');
        } catch (err) {
            // Rollback
            setUsers((prev) => prev.filter(u => u.id !== tempId));
            toast.error('Failed to create user');
        }
    };

    const updateUser = async (id: string, userInput: UserCreateInput) => {
        const originalUsers = [...users];

        // Optimistic UI Update
        setUsers((prev) => prev.map(u => u.id === id ? { ...u, ...userInput } : u));

        try {
            await userService.updateUser(id, userInput);
            toast.success('User updated successfully');
        } catch (err) {
            // Rollback
            setUsers(originalUsers);
            toast.error('Failed to update user');
        }
    };

    const deleteUser = async (id: string) => {
        const originalUsers = [...users];

        // Optimistic UI Update
        setUsers((prev) => prev.filter(u => u.id !== id));

        try {
            await userService.deleteUser(id);
            toast.success('User deleted successfully');
        } catch (err) {
            // Rollback
            setUsers(originalUsers);
            toast.error('Failed to delete user');
        }
    };

    return { users, loading, error, addUser, updateUser, deleteUser, refresh: fetchUsers };
};
