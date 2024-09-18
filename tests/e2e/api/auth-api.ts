import {defaultConfig} from '../config';
import axios from 'axios';

class AuthApi {
  private baseUrl = defaultConfig.baseUrl + '/auth';

  async createToken() {
    try {
      const response = await axios.post(this.baseUrl, {email: defaultConfig.userEmail, password: defaultConfig.userPassword});
      return response.data.token;
    } catch (error) {
      throw new Error('Failed to Create Token, verify credentials');
    }
  }
}
export const authApi = new AuthApi();
