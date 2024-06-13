import axios from 'axios';
import { baseUrl } from '../config';

export interface UserData {
    name: string;
    email: string;
    age?: number;
    notes?: string;
    isActivated?: boolean;
}

export class UsersApi {
    private baseUrl = baseUrl + '/users'

    async createUser(userData: UserData) {
        try {
            const response = await axios.post(this.baseUrl, userData);
            return response.data._id;
        } catch (error) {
            throw new Error(`Failed to Create User ${userData.name}`);
        }
    }

    async deleteUser(userId: string) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to Delete User ${userId}`);
        }
    }
}   