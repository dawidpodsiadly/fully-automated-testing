import axios from 'axios';
import {defaultConfig} from '../config';
import {apiTokenService} from '../services/api-token.service';

export enum ApiUserContractPositions {
  Storekeeper = 'Storekeeper',
  Accountant = 'Accountant',
  IT = 'IT',
}

export enum ApiUserContractTypes {
  Employment = 'Employment',
  Mandate = 'Mandate',
  B2B = 'B2B',
}

export interface ApiUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthDate?: string;
  contract?: {
    type?: ApiUserContractTypes;
    salary?: number;
    position?: ApiUserContractPositions;
    startTime?: string;
    endTime?: string;
  };
  age?: number;
  notes?: string;
  isAdmin?: boolean;
  isActivated?: boolean;
}

class UsersApi {
  private baseUrl = defaultConfig.baseUrl + '/users';

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          Authorization: await apiTokenService.getAuthToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to Get Users: ${error}`);
    }
  }

  async createUser(userData: ApiUserData) {
    try {
      const response = await axios.post(this.baseUrl, userData, {
        headers: {
          Authorization: await apiTokenService.getAuthToken(),
        },
      });
      return {
        id: response.data.id,
        email: userData.email,
        password: userData.password,
      };
    } catch (error) {
      throw new Error(`Failed to Create User ${userData.name}, ${error}`);
    }
  }

  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${userId}`, {
        headers: {
          Authorization: await apiTokenService.getAuthToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to Delete User ${userId}, ${error}`);
    }
  }
}

export const usersApi = new UsersApi();
