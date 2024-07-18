import { expect, test } from '@playwright/test';
import { NavigationPaths, navigationService } from '../../services/navigation.service';
import { cleanupService } from '../../services/cleanup.service';
import { LoginPage } from '../../models/login-page/login-page.model';
import { setText } from '../../utils/input.utils';
import { defaultConfig } from '../../config';
import { usersApi } from '../../api/users-api';
import { randomUtil } from '../../utils/random.utils';

test.describe('Login Page', () => {
  test.beforeEach(async ({page}) => {
    await navigationService.navigateTo(page, NavigationPaths.LOGIN);
  });

  test('Login with Correct Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await setText(loginPage.inputs.email, defaultConfig.userEmail);
    await setText(loginPage.inputs.password, defaultConfig.userPassword);
    await loginPage.locators.loginButton.click();

    await loginPage.expectToBeLoggedIn();
  });

  test('Login with Incorrect Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await setText(loginPage.inputs.email, defaultConfig.userEmail);
    await setText(loginPage.inputs.password, randomUtil.randomName());
    await loginPage.locators.loginButton.click();

    await expect(loginPage.errors.invalidCredentials).toBeVisible();
    await loginPage.expectToBeLoggedIn(false);
  });

  test('Going to any URL Without Logging in Should Redirect to the Login Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userData = await usersApi.createUser();

    await navigationService.navigateTo(page, NavigationPaths.USER_TABLE);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_CREATE);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_EDIT, userData.id);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_DETAILS, userData.id);
    await loginPage.expectToBeLoggedIn(false);
  });

  test.afterAll(async () => {
    await cleanupService.performFullCleanup();
  });
});