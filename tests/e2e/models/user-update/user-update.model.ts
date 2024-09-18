import {expect, Locator, Page} from '@playwright/test';
import {clearText, setText} from '../../utils/input.utils';
import {UserContractPositions, UserContractTypes} from '../../utils/users.utils';
import {CreateUserData} from '../user-creator/user-creator.model';

export class UserUpdate {
  readonly page: Page;
  readonly formLocator: Locator;

  readonly inputs: {
    name: Locator;
    surname: Locator;
    email: Locator;
    changePasswordCheckbox: Locator;
    password: Locator;
    confirmPassword: Locator;
    phoneNumber: Locator;
    birthDate: Locator;
    position: Locator;
    salary: Locator;
    contractType: Locator;
    startTime: Locator;
    endTime: Locator;
    notes: Locator;
    isActivated: Locator;
    isAdmin: Locator;
  };

  readonly locators: {
    submit: Locator;
    cancel: Locator;
  };

  readonly errors: {
    requiredName: Locator;
    requiredSurname: Locator;
    requiredEmail: Locator;
    emailExists: Locator;
    requiredPassword: Locator;
    matchPasswords: Locator;
    shortPassword: Locator;
    phoneNumberNotExist: Locator;
    salaryMustBeNumber: Locator;
    endDateAfterStartDate: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.formLocator = this.page.locator('#update-user-form');

    this.inputs = {
      name: this.formLocator.locator('#name'),
      surname: this.formLocator.locator('#surname'),
      email: this.formLocator.locator('#email'),
      changePasswordCheckbox: this.formLocator.locator('#changePassword'),
      password: this.formLocator.locator('#password'),
      confirmPassword: this.formLocator.locator('#confirmPassword'),
      phoneNumber: this.formLocator.locator('#phoneNumber'),
      birthDate: this.formLocator.locator('#birthDate'),
      position: this.formLocator.locator('#position'),
      salary: this.formLocator.locator('#salary'),
      contractType: this.formLocator.locator('#contractType'),
      startTime: this.formLocator.locator('#startTime'),
      endTime: this.formLocator.locator('#endTime'),
      notes: this.formLocator.locator('#notes'),
      isActivated: this.formLocator.locator('#isActivated'),
      isAdmin: this.formLocator.locator('#isAdmin'),
    };

    this.locators = {
      submit: this.formLocator.locator('#submit-button'),
      cancel: this.formLocator.locator('#cancel-button'),
    };

    this.errors = {
      requiredName: this.formLocator.locator('p.text-danger', {hasText: 'User Name is required'}),
      requiredSurname: this.formLocator.locator('p.text-danger', {hasText: 'Surname is required'}),
      requiredEmail: this.formLocator.locator('p.text-danger', {hasText: 'Email  is required'}),
      emailExists: this.formLocator.locator('p.text-danger', {hasText: 'Email already exists'}),
      requiredPassword: this.formLocator.locator('p.text-danger', {hasText: 'Password is required'}),
      matchPasswords: this.formLocator.locator('p.text-danger', {hasText: 'Passwords must match'}),
      shortPassword: this.formLocator.locator('p.text-danger', {
        hasText: 'Password must be at least 9 characters long',
      }),
      phoneNumberNotExist: this.formLocator.locator('p.text-danger', {hasText: 'Your phone number does not exist'}),
      salaryMustBeNumber: this.formLocator.locator('p.text-danger', {hasText: 'Salary must be a number'}),
      endDateAfterStartDate: this.formLocator.locator('p.text-danger', {hasText: 'End date must be after start date'}),
    };
  }

  async submitForm() {
    await this.locators.submit.click();
  }

  async isVisible(isVisible = true) {
    isVisible ? await expect(this.formLocator).toBeVisible() : await expect(this.formLocator).not.toBeVisible();
  }

  async clearAllInputs() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    await clearText(this.inputs.name);
    await clearText(this.inputs.surname);
    await clearText(this.inputs.email);
    await clearText(this.inputs.phoneNumber);
    await clearText(this.inputs.birthDate);
    await this.inputs.contractType.selectOption(UserContractTypes.Empty);
    await clearText(this.inputs.salary);
    await this.inputs.position.selectOption(UserContractPositions.Empty);
    await clearText(this.inputs.startTime);
    await clearText(this.inputs.endTime);
    await clearText(this.inputs.notes);
  }

  async updateUserForm(userData: Partial<CreateUserData>) {
    userData.name ? await setText(this.inputs.name, userData.name) : null;
    userData.surname ? await setText(this.inputs.surname, userData.surname) : null;
    userData.email ? await setText(this.inputs.email, userData.email) : null;

    if (userData.password) {
      if (!(await this.inputs.changePasswordCheckbox.isChecked())) {
        await this.inputs.changePasswordCheckbox.click();
      }
      await setText(this.inputs.password, userData.password);
      await setText(this.inputs.confirmPassword, userData.password);
    }

    userData.phoneNumber ? await setText(this.inputs.phoneNumber, userData.phoneNumber) : null;
    userData.birthDate ? await setText(this.inputs.birthDate, userData.birthDate) : null;
    userData.contract?.position ? await this.inputs.position.selectOption(userData.contract.position) : null;
    userData.contract?.salary ? await setText(this.inputs.salary, userData.contract.salary) : null;
    userData.contract?.type ? await this.inputs.contractType.selectOption(userData.contract.type) : null;
    userData.contract?.startTime ? await setText(this.inputs.startTime, userData.contract.startTime) : null;
    userData.contract?.endTime ? await setText(this.inputs.endTime, userData.contract.endTime) : null;
    userData.notes ? await setText(this.inputs.notes, userData.notes) : null;

    if (userData.isActivated !== undefined) {
      const isActivatedChecked = await this.inputs.isActivated.isChecked();
      if (userData.isActivated !== isActivatedChecked) {
        await this.inputs.isActivated.click({delay: 1000});
      }
    }

    if (userData.isAdmin !== undefined) {
      const isAdminChecked = await this.inputs.isAdmin.isChecked();
      if (userData.isAdmin !== isAdminChecked) {
        await this.inputs.isAdmin.click({delay: 1000});
      }
    }
    await this.submitForm();
  }
}
