import {defaultConfig} from '../config';
import axios from 'axios';

export enum TestUsers {
  apiTesterAdmin = 'apitesteradmin@gmail.com',
  apiTesterNotAdmin = 'apitesternotadmin@gmail.com',
  apiTesterDeactivated = 'apitesterdeactivated@gmail.com',
  apiTesterNotExisting = 'apitesternotexisting@gmail.com',
}

export const testPassword = 'polskagurom';

class AuthApi {
  private baseUrl = defaultConfig.baseUrl + '/auth';

  async createToken() {
    try {
      const response = await axios.post(this.baseUrl, {email: TestUsers.apiTesterAdmin, password: testPassword});
      return response.data.token;
    } catch (error) {
      throw new Error('Failed to Create Token, verify credentials');
    }
  }
}
export const authApi = new AuthApi();
