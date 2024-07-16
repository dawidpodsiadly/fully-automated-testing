import request from 'supertest';
import { PathService } from './path-service';
import { authService } from './auth-service';

const usersUrl = PathService.paths.users

class CleanupService {
    async performFullCleanup() {
        await this.cleanupUsers();
    }

    async cleanupUsers() {
        try {
            const usersGetResponse = await request(usersUrl).get('/').set(await authService.authorizeToken());
            const usersToDelete = usersGetResponse.body.filter((user: any) => user.email.startsWith('api_'));

            if (usersToDelete.length > 0) {
                for (const user of usersToDelete) {
                    await request(usersUrl).delete(`/${user._id}`).set(await authService.authorizeToken());
                }
            }
          } catch (error) {
            console.error('Error during Users Cleanup: ', error);
          }
    }
}
export const cleanupService = new CleanupService();