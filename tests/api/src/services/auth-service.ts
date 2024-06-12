import request from 'supertest';
import { PathService } from './path-service';
import { authBody } from '../utils/bodies.util';

export enum TestUsers {
  apiTesterAdmin = 'apitesteradmin@gmail.com',
  apiTesterNotAdmin = 'apitesternotadmin@gmail.com',
  apiTesterDeactivated = 'apitesterdeactivated@gmail.com',
  apiTesterNotExisting = 'apitesternotexisting@gmail.com'
}

export const testPassword = 'polskagurom';
export const invalidAuthToken = { Authorization: 'Bearer invalidToken' };

class AuthService {
  async authorizeToken(email: string = TestUsers.apiTesterAdmin, password: string = testPassword): Promise<{ Authorization: string }> {
    const response = await request(PathService.paths.auth).post('/').send(authBody(email, password));
    return {
      Authorization: 'Bearer ' + response.body.token,
    };
  }
}

export const authService = new AuthService();