import request from 'supertest';
import { PathService } from './path-service';
import { authBody } from '../utils/bodies.util';

export enum TestUsers {
  apiTesterAdmin = 'admin@interia.pl',
  apiTesterNotAdmin = 'notAdmin@gmail.com',
  apiTesterNotActivated = 'notActivated@gmail.com'
}

export const testPassword = 'admin@interia.pl';
export const notExistingToken = 'notExistingToken';

class AuthService {
  async getToken(email: string, password: string) {
    const response = await request(PathService.paths.auth).post('/').send(authBody(email, password));

    return {
      Authorization: 'Bearer ' + response.body.token,
    };
  }
}

export const authService = new AuthService();
