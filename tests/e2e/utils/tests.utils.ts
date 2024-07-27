import {Page} from '@playwright/test';
import {LoginPage} from '../models/login-page/login-page.model';
import {createUserByApi} from './users.utils';
import {UserTable} from '../models/user-table/user-table.model';
import {UserDetails} from '../models/user-details/user-details.model';

export async function performTestInitialization(page: Page) {
  const loginPage = new LoginPage(page);

  const testUserData = await createUserByApi(true, true);
  await loginPage.openLoginPageAndLogin(testUserData.email, testUserData.password);

  return testUserData;
}

export async function logoutAndLogin(page: Page, email: string, password: string, isUserTableView = true) {
  const userTable = new UserTable(page);
  const userDetails = new UserDetails(page);
  const loginPage = new LoginPage(page);

  isUserTableView ? await userTable.logOut() : userDetails.logout();
  await loginPage.login(email, password);
}
