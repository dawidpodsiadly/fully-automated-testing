import {Page} from '@playwright/test';
import {LoginPage} from '../models/login-page/login-page.model';
import {createUserByApi} from './users.utils';
import {UserTable} from '../models/user-table/user-table.model';
import {UserDetails} from '../models/user-details/user-details.model';
import {NavigationPaths, navigationService} from '../services/navigation.service';

export async function performTestInitialization(page: Page) {
  const loginPage = new LoginPage(page);

  const testUserData = await createUserByApi(true, true);
  await navigationService.navigateTo(loginPage.page, NavigationPaths.LOGIN);
  await loginPage.login(testUserData.email, testUserData.password);
  await loginPage.expectToBeLoggedIn();

  return testUserData;
}

export async function logoutAndLogin(page: Page, email: string, password: string, isUserTableView = true) {
  const userTable = new UserTable(page);
  const userDetails = new UserDetails(page);
  const loginPage = new LoginPage(page);

  if (isUserTableView) {
    await navigationService.navigateTo(page, NavigationPaths.USER_TABLE);
    await userTable.logout()
  } else {
    await userDetails.logout();
  }

  await loginPage.login(email, password);
}
