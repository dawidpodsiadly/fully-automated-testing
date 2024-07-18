import { Page, Locator } from '@playwright/test';

export class UpdateUserForm {
    readonly page: Page;
    readonly formLocator: Locator

    readonly inputs: {
        nameInput: Locator
        emailInput: Locator
        ageInput: Locator
        notesInput: Locator
        activateCheckbox: Locator
      };
    
      readonly locators: {
        submit: Locator
        cancel: Locator
      };
  
    constructor(page: Page) {
      this.page = page;
      this.formLocator = this.page.locator('#update-user-form');

    this.inputs = {
        nameInput: this.formLocator.locator('#update-user-form-name'),
        emailInput: this.formLocator.locator('#update-user-form-email'),
        ageInput: this.formLocator.locator('#update-user-form-age'),
        notesInput: this.formLocator.locator('#update-user-form-notes'),
        activateCheckbox: this.formLocator.locator('#update-user-form-is-activated'),
      };

    this.locators = {
        submit: this.formLocator.locator('#update-user-form-submit-button'),
        cancel: this.formLocator.locator('#update-user-form-cancel-cutton'),
    }
    }
  
  }