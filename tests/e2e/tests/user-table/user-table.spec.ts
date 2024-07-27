import {expect, test} from '@playwright/test';
import {LoginPage} from '../../models/login-page/login-page.model';
import {randomUtil} from '../../utils/random.utils';
import {createUserByApi, generateRandomUserData} from '../../utils/users.utils';
import {UserTable} from '../../models/user-table/user-table.model';
import {logoutAndLogin, performTestInitialization} from '../../utils/tests.utils';
import {UserDetails} from '../../models/user-details/user-details.model';
import {setText} from '../../utils/input.utils';
import {UserUpdate} from '../../models/user-update/user-update.model';

let testUser;

test.describe('User Table', () => {
  test.beforeEach(async ({page}) => {
    testUser = await performTestInitialization(page);
  });

  test('Update Action - Update User to Admin/Not Admin', async ({page}) => {
    const userTable = new UserTable(page);
    const userUpdate = new UserUpdate(page);
    const userDetails = new UserDetails(page);

    const user = await createUserByApi();

    /** Change to Not Admin **/
    const userRow = await userTable.getRowByEmail(user.email);
    await userRow.goToUpdateUserView();
    await userUpdate.updateUserForm({isAdmin: false});
    await logoutAndLogin(page, user.email, user.password);
    await userDetails.isVisible();

    /** Change to Admin **/
    await logoutAndLogin(page, testUser.email, testUser.password, false);
    await userTable.searchByEmail(user.email);
    await userRow.goToUpdateUserView();
    await userUpdate.updateUserForm({isAdmin: true});

    await logoutAndLogin(page, user.email, user.password);
    await userTable.isVisible();
  });

  test.only('Update Action - Update User to Activated/Deactivated', async ({page}) => {
    const userTable = new UserTable(page);
    const userUpdate = new UserUpdate(page);
    const loginPage = new LoginPage(page);

    const user = await createUserByApi();

    /** Change to Deactivated **/
    const userRow = await userTable.getRowByEmail(user.email);
    await userRow.goToUpdateUserView();
    await userUpdate.updateUserForm({isActivated: false});

    // await userTable.isVisible();
    await logoutAndLogin(page, user.email, user.password);
    await expect(loginPage.errors.deactivatedAccount).toBeVisible();

    /** Change to Activated **/
    await loginPage.login(testUser.email, testUser.password);
    await userTable.searchByEmail(user.email);
    await userRow.goToUpdateUserView();
    await userUpdate.updateUserForm({isActivated: true});

    await logoutAndLogin(page, user.email, user.password);
    await userTable.isVisible();
  });

  test('Update Action - Update User by Only the Required Fields Without changing the Password and Check if the User Can Log in with the Old Password', async ({
    page,
  }) => {
    const userUpdate = new UserUpdate(page);
    const userTable = new UserTable(page);
    const userDetials = new UserDetails(page);

    const user = await createUserByApi(false, false);
    const updatedUserData = {
      name: randomUtil.randomName(),
      surname: randomUtil.randomName(),
      email: randomUtil.randomEmail(),
      isActivated: true,
      isAdmin: true,
    };

    const userRow = await userTable.getRowByEmail(user.email);
    await userRow.actions.update.click();
    await userUpdate.clearAllInputs();
    await userUpdate.updateUserForm(updatedUserData);

    const updatedUserRow = await userTable.getRowByEmail(updatedUserData.email);
    await updatedUserRow.checkUserData(updatedUserData);
    await updatedUserRow.userData.name.click();
    await userDetials.checkUserData(updatedUserData);

    // User should log in with old password
    await logoutAndLogin(page, updatedUserData.email, user.password);
    await userTable.isVisible();
  });

  test('Update Action - Update User and Log in with Updated Password + Validate inputs', async ({page}) => {
    const userUpdate = new UserUpdate(page);
    const userTable = new UserTable(page);
    const userDetials = new UserDetails(page);

    const updatedUserData = await generateRandomUserData();
    const user = await createUserByApi(false, false);

    const userRow = await userTable.getRowByEmail(user.email);
    await userRow.actions.update.click();

    /** Required Inputs **/
    await userUpdate.clearAllInputs();
    await userUpdate.inputs.changePasswordCheckbox.click();
    await userUpdate.submitForm();
    await expect(userUpdate.errors.requiredName, `Error 'Name is required' Should be Visible`).toBeVisible();
    await expect(userUpdate.errors.requiredSurname, `Error 'Surname is required' Should be Visible`).toBeVisible();
    await expect(userUpdate.errors.requiredEmail, `Error 'Email is required' Should be Visible`).toBeVisible();
    await expect(userUpdate.errors.requiredPassword, `Error 'Password is required' Should be Visible`).toBeVisible();

    /** Password must be at least 9 characters long && Passwords must match **/
    await userUpdate.updateUserForm({
      name: updatedUserData.name,
      surname: updatedUserData.surname,
      email: updatedUserData.email,
    });
    await setText(userUpdate.inputs.password, randomUtil.randomName(8));
    await userUpdate.submitForm();
    await expect(
      userUpdate.errors.shortPassword,
      `Error 'Password must be at least 9 characters long' Should be Visible`,
    ).toBeVisible();
    await expect(userUpdate.errors.matchPasswords, `Error 'Passwords must match' Should be Visible`).toBeVisible();

    // Your phone number does not exist
    await userUpdate.updateUserForm({phoneNumber: randomUtil.randomName(), password: updatedUserData.password});
    await expect(
      userUpdate.errors.phoneNumberNotExist,
      `Error 'Your phone number does not exist' Should be Visible`,
    ).toBeVisible();

    // Salary must be a number
    await userUpdate.updateUserForm({
      contract: {salary: randomUtil.randomName()},
      phoneNumber: updatedUserData.phoneNumber,
    });
    await expect(
      userUpdate.errors.salaryMustBeNumber,
      `Error 'Salary must be a number' Should be Visible`,
    ).toBeVisible();

    // Salary Has to be without minus
    await userUpdate.updateUserForm({contract: {salary: `-${randomUtil.randomStringNumber(4)}`}});
    await expect(
      userUpdate.errors.salaryMustBeNumber,
      `Error 'Salary must be a number' Should be Visible`,
    ).toBeVisible();

    // End date must be after start date
    await userUpdate.updateUserForm({
      contract: {
        startTime: updatedUserData.contract.endTime,
        endTime: updatedUserData.contract.startTime,
        salary: updatedUserData.contract.salary,
      },
    });
    await expect(
      userUpdate.errors.endDateAfterStartDate,
      `Error 'End date must be after start date' Should be Visible`,
    ).toBeVisible();

    /** Email already exists **/
    await userUpdate.updateUserForm({
      email: testUser.email,
      contract: {startTime: updatedUserData.contract.startTime, endTime: updatedUserData.contract.endTime},
    });
    await expect(userUpdate.errors.emailExists, `Error 'Email already exists' Should be Visible`).toBeVisible();

    /** Update rest fields and submit **/
    await userUpdate.updateUserForm({
      email: updatedUserData.email,
      birthDate: updatedUserData.birthDate,
      contract: {
        type: updatedUserData.contract.type,
        position: updatedUserData.contract.position,
      },
      notes: updatedUserData.notes,
      isActivated: true,
      isAdmin: true,
    });

    // User should be updated correctly
    const updatedUserRow = await userTable.getRowByEmail(updatedUserData.email);
    await updatedUserRow.checkUserData(updatedUserData);
    await updatedUserRow.userData.name.click();
    await userDetials.checkUserData(updatedUserData);

    // User should log in with new credentials
    await logoutAndLogin(page, updatedUserData.email, updatedUserData.password);
    await userTable.isVisible();
  });

  test('Table - Mass Removal of Users', async ({page}) => {
    const userTable = new UserTable(page);

    const user1 = await createUserByApi();
    const user2 = await createUserByApi();

    const userRow1 = await userTable.getRowByEmail(user1.email);
    await userRow1.userData.checkbox.click();
    const userRow2 = await userTable.getRowByEmail(user2.email);
    await userRow2.userData.checkbox.click();

    await userTable.locators.deleteSelectedUsers.click();
    await userTable.deleteUserModal.delete.click();

    await userTable.searchByEmail(user1.email);
    await userRow1.isVisible(false);
    await userTable.searchByEmail(user2.email);
    await userRow2.isVisible(false);
  });

  test('Activate/Deactivate Action - Activate/Deactivate User', async ({page}) => {
    const userTable = new UserTable(page);
    const loginPage = new LoginPage(page);

    const user = await createUserByApi();

    /** Deactivate User **/
    const userRow1 = await userTable.getRowByEmail(user.email);
    await userRow1.actions.activation.click();
    await logoutAndLogin(page, user.email, user.password);
    await expect(loginPage.errors.deactivatedAccount).toBeVisible();

    /** Activate User **/
    await loginPage.login(testUser.email, testUser.password);
    await userTable.searchByEmail(user.email);
    await expect(userRow1.userData.status).toHaveClass('text-danger');
    await userRow1.actions.activation.click();

    await logoutAndLogin(page, user.email, user.password);
    await userTable.searchByEmail(user.email);
    await expect(userRow1.userData.status).toHaveClass('text-success');
  });

  test('Delete Action - Delete User', async ({page}) => {
    const userTable = new UserTable(page);
    const loginPage = new LoginPage(page);

    const user = await createUserByApi();

    const userRow1 = await userTable.getRowByEmail(user.email);
    await userRow1.actions.delete.click();
    await userTable.deleteUserModal.delete.click();
    await userTable.searchByEmail(user.email);
    await userRow1.isVisible(false);

    await logoutAndLogin(page, user.email, user.password);
    await expect(loginPage.errors.invalidCredentials).toBeVisible();
  });
});
