import request from 'supertest';
import { PathService } from '../services/path-service';
import { authBody } from '../utils/bodies.util';
import { TestUsers } from '../services/auth-service';
import { testPassword } from '../services/auth-service';

const baseUrl = PathService.paths.user

describe('Auth Endpoints', () => {
    describe('POST /auth', () => {
        it('Should return 401 when Invalid Credentials - POST /auth', async () => {
            const response = await request(baseUrl).post('/').send(authBody('wrongEmail', testPassword));
            expect(response.body.message).toContain('Invalid email or password');
            expect(response.statusCode).toEqual(401);
          });
      
          it('Should return 200 Token when Valid Credentials - POST /auth', async () => {
              const response = await request(baseUrl).post('/').send(authBody(TestUsers.apiTesterAdmin, testPassword));
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('token');
        });     
        
        // when no auth
        // when not activated
    })
});
