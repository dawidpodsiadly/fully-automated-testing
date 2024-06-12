import request from 'supertest';
import { PathService } from '../services/path-service';
import { authService } from '../services/auth-service';
import { userBody } from '../utils/bodies.util';
import { TestUsers } from '../services/auth-service';
import { testPassword } from '../services/auth-service';
import { randomUtil } from '../utils/random.util';

const baseUrl = PathService.paths.user;
let adminToken: { Authorization: string };

describe('User Endpoints', () => {
    beforeAll(async () => {
        adminToken = await authService.authorizeToken();
    });

    describe('GET /User', () => {
        it('Should return 401 when no Credentials', async () => {
            const response = await request(baseUrl).post('/').send(userBody());

            expect(response.status).toBe(401);
            expect(response.text).toEqual('Unauthorized');
        })

        it('Should return 403 when User is Not Admin', async () => {
            const response = await request(baseUrl).post('/').send(userBody()).set(await authService.authorizeToken(TestUsers.apiTesterNotAdmin, testPassword));
            
            expect(response.status).toBe(403);
            expect(response.body.message).toEqual('Unauthorized: Only administrators can perform this action');
        })

        it('Should return 400 when Email already Exists', async () => {
            const existingEmail = randomUtil.randomEmail();
            await request(baseUrl).post('/').send(userBody({ email: existingEmail })).set(adminToken);

            const response = await request(baseUrl).post('/').send(userBody({ email: existingEmail })).set(adminToken);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('User with this email already exists');
        })

        it('Should return 400 when Contract End Time is earlier than Start Time', async () => {
            const contractStartTime = '1939-09-10';
            const contractEndTime = '1410-07-15';

            const response = await request(baseUrl).post('/')
            .send({
                ...userBody(),
                contract: {
                    ...userBody().contract,
                    startTime: contractStartTime,
                    endTime: contractEndTime
                }
            })
            .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('End time cannot be earlier than start time');
        })

        it('Should return 200 and Create new User', async () => {
            const userBodyData = userBody();
        
            const response = await request(baseUrl).post('/').send(userBodyData).set(adminToken);
            expect(response.status).toBe(200);

            expect(response.body.name).toEqual(userBodyData.name);
            expect(response.body.surname).toEqual(userBodyData.surname);
            expect(response.body.email).toEqual(userBodyData.email);
            expect(response.body.phoneNumber).toEqual(userBodyData.phoneNumber);
            expect(response.body.birthDate).toEqual(userBodyData.birthDate);

            expect(response.body.contract.type).toEqual(userBodyData.contract.type);
            expect(response.body.contract.salary).toEqual(userBodyData.contract.salary);
            expect(response.body.contract.position).toEqual(userBodyData.contract.position);
            expect(response.body.contract.startTime).toEqual(userBodyData.contract.startTime);
            expect(response.body.contract.endTime).toEqual(userBodyData.contract.endTime);
            
            expect(response.body.notes).toEqual(userBodyData.notes);
            expect(response.body.isAdmin).toEqual(userBodyData.isAdmin);
            expect(response.body.isActivated).toEqual(userBodyData.isActivated);
            expect(response.body).toHaveProperty('lastUpdated');

        });

        it('Should return 400 when Required Filed is Missing (Name, Surname, Email, Password)', async () => {
            let userBody = {
                name: '',
                surname: '',
                email: '',
                password: randomUtil.randomName(9),
            }

            let response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('User validation failed: name: Path `name` is required., surname: Path `surname` is required., email: Path `email` is required.');

            userBody.name = randomUtil.randomNameWithPrefix();

            response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('User validation failed: surname: Path `surname` is required., email: Path `email` is required.');

            userBody.surname = randomUtil.randomNameWithPrefix();

            response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('User validation failed: email: Path `email` is required.');
            
            userBody.email = randomUtil.randomEmail();
            userBody.password = ''

            response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Password must be at least 9 characters long');

            userBody.password = randomUtil.randomName(9);

            response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(200);
        })

        it('Should return 200 and isAdmin and isActivated Should be `false` when Not Passed', async () => {
            let userBody = {
                name:  randomUtil.randomNameWithPrefix(),
                surname:  randomUtil.randomNameWithPrefix(),
                email:  randomUtil.randomEmail(),
                password:  randomUtil.randomName(),
            }

            const response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(userBody.name);
            expect(response.body.surname).toEqual(userBody.surname);
            expect(response.body.email).toEqual(userBody.email);
            expect(response.body.isAdmin).toEqual(false);
            expect(response.body.isActivated).toEqual(false);
            expect(response.body).toHaveProperty('lastUpdated');
        })

        it('Should return 400 when Phone Number `< 9` or `> 14`', async () => {
            const phoneNumberTooShort = '12345678';
            const phoneNumberTooLong = '123456789012345';

            let response = await request(baseUrl).post('/')
            .send({
                ...userBody(),
                phoneNumber: phoneNumberTooShort,
            })
            .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Phone number cannot be shorter than 9 digits or longer than 14');

            response = await request(baseUrl).post('/')
            .send({
                ...userBody(),
                phoneNumber: phoneNumberTooLong,
            })
            .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Phone number cannot be shorter than 9 digits or longer than 14');
        })

        it('Should return 400 when Password is `< 9` Chars>', async () => {
            const passwordTooShort = randomUtil.randomName(8);

            let response = await request(baseUrl).post('/')
            .send({
                ...userBody(),
                password: passwordTooShort,
            })
            .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Password must be at least 9 characters long');
        })

        it('Should return 400 when Trying to Send lastUpdated Field', async () => {
            let userBody = {
                name:  randomUtil.randomNameWithPrefix(),
                surname:  randomUtil.randomNameWithPrefix(),
                email:  randomUtil.randomEmail(),
                password:  randomUtil.randomName(),
                lastUpdated: '1920-08-12'
            }

            const response = await request(baseUrl).post('/').send(userBody).set(adminToken);
            expect(response.status).toBe(200);
            await console.log(response.body);
        })

        it('Should return 400 when Trying to add Position Filed other than Storekeeper, Accountant, IT ', async () => {
            const notExistingContractPosition = randomUtil.randomName();

            const response = await request(baseUrl).post('/')
            .send({
                    ...userBody(),
                    contract: {
                        ...userBody().contract,
                        position: notExistingContractPosition,
                    }
                })
                .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual(`User validation failed: contract.position: \`${notExistingContractPosition}\` is not a valid enum value for path \`contract.position\`.`);
        })

        it('Should return 400 when Trying to add Contract Type Filed other than Employment, Mandate, IT ', async () => {
            const notExistingContractType = randomUtil.randomName();

            const response = await request(baseUrl).post('/')
            .send({
                    ...userBody(),
                    contract: {
                        ...userBody().contract,
                        type: notExistingContractType,
                    }
                })
                .set(adminToken);
                expect(response.status).toBe(400);
                expect(response.body.message).toEqual(`User validation failed: contract.type: \`${notExistingContractType}\` is not a valid enum value for path \`contract.type\`.`);
        })

        it('Should return 400 when Trying to Add something Other than Date to the Fields', async () => {
            const notDateBirthDate = randomUtil.randomName();
            const notDateContractStartTime = randomUtil.randomName();
            const notDateContractEndTime = randomUtil.randomName();

            let response = await request(baseUrl).post('/')
            .send({...userBody(), 
                birthDate: notDateBirthDate})
                .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Invalid date format');

            response = await request(baseUrl).post('/')
            .send({
                    ...userBody(),
                    contract: {
                        ...userBody().contract,
                        startTime: notDateContractStartTime,
                    }
                })
                .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Invalid date format')

            response = await request(baseUrl).post('/')
            .send({
                    ...userBody(),
                    contract: {
                        ...userBody().contract,
                        startTime: notDateContractEndTime,
                    }
                })
                .set(adminToken);

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual('Invalid date format')
        })
    });
});
