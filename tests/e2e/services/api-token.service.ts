import {authApi} from '../api/auth-api';

export class ApiTokenService {
  async getAuthToken() {
    const createTokenResponse = await authApi.createToken();
    const bearerToken = 'Bearer ' + createTokenResponse;

    return bearerToken;
  }
}
export const apiTokenService = new ApiTokenService();
