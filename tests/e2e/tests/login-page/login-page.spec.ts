import {expect, test} from '@playwright/test';
import {NavigationPaths, navigationService} from '../../services/navigation.service';
import {LoginPage} from '../../models/login-page/login-page.model';
import {defaultConfig} from '../../config';
import {randomUtil} from '../../utils/random.utils';
import {createUserByApi} from '../../utils/users.utils';

test.describe('Login Page', () => {
  test.beforeEach(async ({page}) => {
    await navigationService.navigateTo(page, NavigationPaths.LOGIN);
  });

  test('Login with Correct Credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(defaultConfig.userEmail, defaultConfig.userPassword);
    await loginPage.expectToBeLoggedIn();
  });

  test('Login with Incorrect Credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(defaultConfig.userEmail, randomUtil.randomName());
    await expect(loginPage.errors.invalidCredentials).toBeVisible();
    await loginPage.expectToBeLoggedIn(false);
  });

  test('Going to any URL Without Logging in Should Redirect to the Login Page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const userData = await createUserByApi();

    await navigationService.navigateTo(page, NavigationPaths.USER_TABLE);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_CREATE);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_EDIT, userData.id);
    await loginPage.expectToBeLoggedIn(false);

    await navigationService.navigateTo(page, NavigationPaths.USER_DETAILS, userData.id);
    await loginPage.expectToBeLoggedIn(false);
  });
});
