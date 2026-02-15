import axios from 'axios';
import { User, UserCreateInput } from '../types/user.types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';


export const userService = {
    getUsers: async (): Promise<User[]> => {
        const response = await axios.get(API_URL);
        return response.data.map((user: any) => ({
            id: user.id.toString(),
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ')[1] || '',
            email: user.email,
            phoneNumber: user.phone.replace(/[^0-9]/g, '').slice(0, 10),
        }));
    },

    createUser: async (user: UserCreateInput): Promise<User> => {
        const response = await axios.post(API_URL, user);
        return { ...response.data, id: Math.random().toString(36).substr(2, 9) };
    },

    updateUser: async (id: string, user: UserCreateInput): Promise<User> => {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};
