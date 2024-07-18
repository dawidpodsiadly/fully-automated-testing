import axios from 'axios';
import { defaultConfig } from '../config';
import { randomUtil } from '../utils/random.utils';
import { apiTokenService } from '../services/api-token.service';

enum Positions {
    Storekeeper = 'Storekeeper',
    Accountant = 'Accountant',
    IT = 'IT'
}

enum ContractTypes {
    Employment = 'Employment',
    Mandate = 'Mandate',
    B2B = 'B2B'
}

export interface UserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber?: string;
    birthDate?: string;
    contract?: {
        type?: ContractTypes;
        salary?: number;
        position?: Positions;
        startTime?: string;
        endTime?: string;
    };
    age?: number;
    notes?: string;
    isAdmin?: boolean;
    isActivated?: boolean;
}

class UsersApi {
    private baseUrl = defaultConfig.baseUrl + '/users'

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl, {
                headers: {
                    Authorization: await apiTokenService.getAuthToken()
                }
        });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to Get Users: ${error}`);
        }
    }

    async createUser(isAdmin = true, isActivated = true) {
        const userData = this.generateRandomUserData(isAdmin, isActivated)
        try {
            const response = await axios.post(this.baseUrl, userData, {
                headers: {
                    Authorization: await apiTokenService.getAuthToken()
                }
        });
            return {
                id: response.data.id,
                email: userData.email,
                password: userData.password,
            }
        } catch (error) {
            throw new Error(`Failed to Create User ${userData.name}, ${error}`);
        }
    }

    async deleteUser(userId: string) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${userId}`, {
                headers: {
                    Authorization: await apiTokenService.getAuthToken()
                }
        });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to Delete User ${userId}, ${error}`);
        }
    }

    private generateRandomUserData(isAdmin = true, isActivated = true): UserData {
        const startTime = randomUtil.randomDate();
        const endTime = randomUtil.randomOlderDate(startTime)

        return {
            name: randomUtil.randomName(),
            surname: randomUtil.randomName(),
            email: randomUtil.randomEmail(),
            password: randomUtil.randomName(9),
            phoneNumber: randomUtil.randomPhoneNumber(),
            birthDate: randomUtil.randomDate(),
            contract: {
                type: randomUtil.randomUserContractType(),
                salary: randomUtil.randomInt(),         
                position: randomUtil.randomUserPosition(),
                startTime,
                endTime,
            },
            age: randomUtil.randomInt(),
            notes: randomUtil.randomName(50),
            isAdmin,
            isActivated,
    }
}
}

export const usersApi = new UsersApi();
