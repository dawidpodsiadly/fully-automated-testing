import { Page, Locator } from '@playwright/test';
import { setText } from '../../utils/input.utils'
import { ApiUserContractPositions, ApiUserContractTypes } from '../../api/users-api';
import { NavigationPaths, navigationService } from '../../services/navigation.service';

export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthDate?: string;
  contract?: {
      type?: ApiUserContractTypes;
      salary?: string;
      position?: ApiUserContractPositions;
      startTime?: string;
      endTime?: string;
  };
  age?: string;
  notes?: string;
  isAdmin?: boolean;
  isActivated?: boolean;
}

export class UserCreator {
    readonly page: Page;
    readonly formLocator: Locator

    readonly inputs: {
        name: Locator
        surname: Locator
        email: Locator
        password: Locator
        confirmPassword: Locator
        phoneNumber: Locator
        birthDate: Locator
        position: Locator
        salary: Locator
        contractType: Locator
        startTime: Locator
        endTime: Locator
        notes: Locator
        isActivated: Locator
        isAdmin: Locator
      };
    
      readonly locators: {
        submit: Locator
        cancel: Locator
      };

      readonly errors: {
        requiredName: Locator
        requiredSurname: Locator
        requiredEmail: Locator
        emailExists: Locator
        requiredPassword: Locator
        matchPasswords: Locator
        shortPassword: Locator
        phoneNumberNotExist: Locator
        salaryMustBeNumber: Locator
        endDateAfterStartDate: Locator
      }
  
    constructor(page: Page) {
      this.page = page;
      this.formLocator = this.page.locator('#create-user-form');

    this.inputs = {
        name: this.formLocator.locator('#name'),
        surname: this.formLocator.locator('#surname'),
        email: this.formLocator.locator('#email'),
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
        requiredName: this.formLocator.locator('p.text-danger', { hasText: 'User Name is required' }),
        requiredSurname: this.formLocator.locator('p.text-danger', { hasText: 'Surname is required' }),
        requiredEmail: this.formLocator.locator('p.text-danger', { hasText: 'Email  is required' }),
        emailExists: this.formLocator.locator('p.text-danger', { hasText: 'Email already exists' }),
        requiredPassword: this.formLocator.locator('p.text-danger', { hasText: 'Password is required' }),
        matchPasswords: this.formLocator.locator('p.text-danger', { hasText: 'Passwords must match' }),
        shortPassword: this.formLocator.locator('p.text-danger', { hasText: 'Password must be at least 9 characters long' }),
        phoneNumberNotExist: this.formLocator.locator('p.text-danger', { hasText: 'Your phone number does not exist' }),
        salaryMustBeNumber: this.formLocator.locator('p.text-danger', { hasText: 'Salary must be a number' }),
        endDateAfterStartDate: this.formLocator.locator('p.text-danger', { hasText: 'End date must be after start date' }),
      }
    }

    async submitForm() {
        await this.locators.submit.click();
    }

    async fillUserForm(userData: CreateUserData) {
        await setText(this.inputs.name, userData.name);
        await setText(this.inputs.surname, userData.surname);
        await setText(this.inputs.email, userData.email);
        await setText(this.inputs.password, userData.password);
        await setText(this.inputs.confirmPassword, userData.password);

        userData.phoneNumber ? await setText(this.inputs.phoneNumber, userData.phoneNumber) : null
        userData.birthDate ? await setText(this.inputs.birthDate, userData.birthDate) : null
        userData.contract?.position ? await this.inputs.position.selectOption(userData.contract.position) : null
        userData.contract?.salary ? await setText(this.inputs.salary, userData.contract.salary) : null
        userData.contract?.type ? await this.inputs.contractType.selectOption(userData.contract.type) : null
        userData.contract?.startTime ? await setText(this.inputs.startTime, userData.contract.startTime) : null
        userData.contract?.endTime ? await setText(this.inputs.endTime, userData.contract.endTime) : null
        userData.notes ? await setText(this.inputs.notes, userData.notes) : null

        const isActivatedChecked = await this.inputs.isActivated.isChecked();
        userData.isActivated !== undefined && isActivatedChecked !== userData.isActivated && await this.inputs.isActivated.click();
    
        const isAdminChecked = await this.inputs.isAdmin.isChecked();
        userData.isAdmin !== undefined && isAdminChecked !== userData.isAdmin && await this.inputs.isAdmin.click();

        await this.submitForm();
        await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.USER_TABLE));
    }
}