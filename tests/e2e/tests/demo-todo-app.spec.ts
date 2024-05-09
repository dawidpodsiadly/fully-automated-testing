import { test } from '@playwright/test';
import { NavigationPaths, navigationService } from '../services/navigation.service';

test.describe('User Management Table', () => {
  test('test', async ({ page }) => {
    await navigationService.navigateTo(page, NavigationPaths.USER_TABLE);
  });
});
