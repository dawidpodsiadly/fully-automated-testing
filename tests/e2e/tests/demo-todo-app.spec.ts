import { test, beforeAll } from '@playwright/test';
import { NavigationPaths, navigationService } from '../services/navigation.service';
import { usersApi } from '../api/users-api';
import { apiTokenService } from '../services/api-token.service';
import { cleanupService } from '../services/cleanup.service';

test.describe('User Management Table', () => {
  test('test', async ({ page }) => {
    console.log(await usersApi.getUsers())
  });
  beforeAll(async () => {
    await cleanupService.performFullCleanup();
  });
});