import request from 'supertest';
import { PathService } from '../services/path-service';
import { authService } from '../services/auth-service';
import { TestUsers } from '../services/auth-service';
import { testPassword } from '../services/auth-service';

const baseUrl = PathService.paths.user;
let adminToken: { Authorization: string };

describe('User Endpoints', () => {
    beforeAll(async () => {
        adminToken = await authService.getToken(TestUsers.apiTesterAdmin, testPassword);
    });

    describe('GET /User', () => {
        // test body 
        const userBody = {
            name: 'John Doe',
            surname: 'johndoe',
            email: 'johndoe@exampleee.com',
            password: 'password123'
        };

        it('Should create a user and return 200 status', async () => {
            const response = await request(baseUrl)
                .post('/')
                .send(userBody)
                .set(adminToken);
            expect(response.status).toBe(200);
        });
    });
});
