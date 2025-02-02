import {expect, test} from '@playwright/test';
import {logoutAndLogin, performTestInitialization} from '../../utils/tests.utils';
import {UserTable} from '../../models/user-table/user-table.model';
import {UserCreator, CreateUserData} from '../../models/user-creator/user-creator.model';
import {UserDetails} from '../../models/user-details/user-details.model';
import {LoginPage} from '../../models/login-page/login-page.model';
import {NavigationPaths, navigationService} from '../../services/navigation.service';
import {UnauthorizedView} from '../../models/unauthorized/unauthorized.model';
import {createUserByApi, generateRandomUserData} from '../../utils/users.utils';
import {randomUtil} from '../../utils/random.utils';
import {setText} from '../../utils/input.utils';

test.describe('User Creator', () => {
  test.beforeEach(async ({page}) => {
    await performTestInitialization(page);
  });

  test('Create Activated Admin User', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);
    const userDetails = new UserDetails(page);

    const userData = await generateRandomUserData(true, true);
    await userTable.userHeader.buttons.addUserButton.click();
    await userCreator.fillUserForm(userData);

    const userRow = await userTable.getRowByEmail(userData.email);
    await userRow.checkUserData(userData);

    await userRow.userData.name.click();
    await userDetails.checkUserData(userData);

    await logoutAndLogin(page, userData.email, userData.password);
    await userTable.isVisible();
  });

  test('Create Not Activated Admin User', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);
    const userDetails = new UserDetails(page);
    const loginPage = new LoginPage(page);

    const userData = await generateRandomUserData(true, false);
    await userTable.userHeader.buttons.addUserButton.click();
    await userCreator.fillUserForm(userData);

    const userRow = await userTable.getRowByEmail(userData.email);
    await userRow.checkUserData(userData);

    await userRow.userData.name.click();
    await userDetails.checkUserData(userData);

    await logoutAndLogin(page, userData.email, userData.password);
    await expect(loginPage.errors.deactivatedAccount).toBeVisible();
  });

  test('Create Activated Not Admin User', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);
    const userDetails = new UserDetails(page);
    const unauthorizedView = new UnauthorizedView(page);

    const userData = await generateRandomUserData(false, true);
    await userTable.userHeader.buttons.addUserButton.click();
    await userCreator.fillUserForm(userData);

    const userRow = await userTable.getRowByEmail(userData.email);
    await userRow.checkUserData(userData);

    await userRow.userData.name.click();
    await userDetails.checkUserData(userData);

    await logoutAndLogin(page, userData.email, userData.password);
    await userDetails.isVisible();

    await navigationService.navigateTo(page, NavigationPaths.USER_TABLE);
    await unauthorizedView.isVisible();

    await navigationService.navigateTo(page, NavigationPaths.USER_CREATE);
    await unauthorizedView.isVisible();

    const apiUserData = await createUserByApi();
    await navigationService.navigateTo(page, NavigationPaths.USER_EDIT, await apiUserData.id);
    await unauthorizedView.isVisible();
  });

  test('Create Deactivated Not Admin User', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);
    const userDetails = new UserDetails(page);
    const loginPage = new LoginPage(page);

    const userData = await generateRandomUserData(false, false);
    await userTable.userHeader.buttons.addUserButton.click();
    await userCreator.fillUserForm(userData);

    const userRow = await userTable.getRowByEmail(userData.email);
    await userRow.checkUserData(userData);

    await userRow.userData.name.click();
    await userDetails.checkUserData(userData);

    await logoutAndLogin(page, userData.email, userData.password);
    await expect(loginPage.errors.deactivatedAccount).toBeVisible();
  });

  test('Create User with Only Required Fields (Name, Surname, Email, Password)', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);
    const userDetails = new UserDetails(page);
    const loginPage = new LoginPage(page);

    const userData: CreateUserData = {
      name: randomUtil.randomName(),
      surname: randomUtil.randomName(),
      email: randomUtil.randomEmail(),
      password: randomUtil.randomName(),
    };

    await userTable.userHeader.buttons.addUserButton.click();
    await userCreator.fillUserForm(userData);

    const userRow = await userTable.getRowByEmail(userData.email);
    await userRow.checkUserData(userData);

    await userRow.userData.name.click();
    await userDetails.checkUserData(userData);

    await logoutAndLogin(page, userData.email, userData.password);
    await expect(loginPage.errors.deactivatedAccount).toBeVisible();
  });

  test('Validate User Form Inputs', async ({page}) => {
    const userCreator = new UserCreator(page);
    const userTable = new UserTable(page);

    const user = await createUserByApi();

    await userTable.userHeader.buttons.addUserButton.click();

    /** Required Inputs **/
    await userCreator.submitForm();
    await expect(userCreator.errors.requiredName, `Error 'Name is required' Should be Visible`).toBeVisible();
    await expect(userCreator.errors.requiredSurname, `Error 'Surname is required' Should be Visible`).toBeVisible();
    await expect(userCreator.errors.requiredEmail, `Error 'Email is required' Should be Visible`).toBeVisible();
    await expect(userCreator.errors.requiredPassword, `Error 'Password is required' Should be Visible`).toBeVisible();

    await setText(userCreator.inputs.name, randomUtil.randomName());
    await setText(userCreator.inputs.surname, randomUtil.randomName());
    await setText(userCreator.inputs.email, randomUtil.randomEmail());

    /** Password must be at least 9 characters long && Passwords must match **/
    await setText(userCreator.inputs.password, randomUtil.randomName(8));
    await userCreator.submitForm();
    await expect(userCreator.errors.shortPassword, `Error 'Password must be at least 9 characters long' Should be Visible`).toBeVisible();
    await expect(userCreator.errors.matchPasswords, `Error 'Passwords must match' Should be Visible`).toBeVisible();

    const password = randomUtil.randomName();
    await setText(userCreator.inputs.password, password);
    await setText(userCreator.inputs.confirmPassword, password);

    /** Your phone number does not exist **/
    await setText(userCreator.inputs.phoneNumber, randomUtil.randomName());
    await userCreator.submitForm();
    await expect(userCreator.errors.phoneNumberNotExist, `Error 'Your phone number does not exist' Should be Visible`).toBeVisible();
    await setText(userCreator.inputs.phoneNumber, randomUtil.randomPhoneNumber());

    /** Salary must be a number **/
    await setText(userCreator.inputs.salary, randomUtil.randomName());
    await userCreator.submitForm();
    await expect(userCreator.errors.salaryMustBeNumber, `Error 'Salary must be a number' Should be Visible`).toBeVisible();

    /** Salary Has to be Without Minus **/
    await setText(userCreator.inputs.salary, `-${randomUtil.randomStringNumber(4)}`);
    await userCreator.submitForm();
    await expect(userCreator.errors.salaryMustBeNumber, `Error 'Salary must be a number' Should be Visible`).toBeVisible();
    await setText(userCreator.inputs.salary, randomUtil.randomStringNumber(4));

    /** End date must be after start date **/
    const startTime = randomUtil.randomDate();
    const endTime = randomUtil.randomYoungerDate(startTime);

    await setText(userCreator.inputs.endTime, startTime);
    await setText(userCreator.inputs.startTime, endTime);
    await userCreator.submitForm();
    await expect(userCreator.errors.endDateAfterStartDate, `Error 'End date must be after start date' Should be Visible`).toBeVisible();
    await setText(userCreator.inputs.startTime, startTime);
    await setText(userCreator.inputs.endTime, endTime);

    /** Email already exists **/
    await setText(userCreator.inputs.email, user.email);
    await userCreator.submitForm();
    await expect(userCreator.errors.emailExists, `Error 'Email already exists' Should be Visible`).toBeVisible();
    const createdUserEmail = randomUtil.randomEmail();
    await setText(userCreator.inputs.email, createdUserEmail);

    /** User should be created correctly **/
    await userCreator.submitForm();
    const userRow = await userTable.getRowByEmail(createdUserEmail);
    await userRow.isVisible();
  });
});
