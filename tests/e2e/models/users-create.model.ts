import { Page, Locator, expect } from '@playwright/test';
import { setText } from '../utils/input.utils'

export class CreateUserForm {
    readonly page: Page;
    readonly formLocator: Locator

    readonly locators: {
        nameInput: Locator
        emailInput: Locator
        ageInput: Locator
        notesInput: Locator
        activateCheckbox: Locator
      };
    
      readonly buttons: {
        submit: Locator
        cancel: Locator
      };
  
    constructor(page: Page) {
      this.page = page;
      this.formLocator = this.page.locator('#create-user-form');

    this.locators = {
        nameInput: this.formLocator.locator('#create-user-form-name'),
        emailInput: this.formLocator.locator('#create-user-form-email'),
        ageInput: this.formLocator.locator('#create-user-form-age'),
        notesInput: this.formLocator.locator('#create-user-form-notes'),
        activateCheckbox: this.formLocator.locator('#create-user-form-is-activated'),
      };

    this.buttons = {
        submit: this.formLocator.locator('#create-user-form-submit-button'),
        cancel: this.formLocator.locator('#create-user-form-cancel-cutton'),
      };
    }

    async submitForm() {
        await this.buttons.submit.click();
    }

    async checkErrors(errorsNumber: number) {
        await expect(this.formLocator.locator('.text-danger')).toHaveCount(errorsNumber);
    }

    async fillForm(name: string, email: string, isActivated: boolean, age: string, notes: string) {

        await setText(this.locators.nameInput, name);
        await setText(this.locators.emailInput, email);
        await setText(this.locators.ageInput, age);
        await setText(this.locators.notesInput, notes);

        const isChecked = await this.locators.activateCheckbox.isChecked();
        if (isChecked !== isActivated) {
            await this.locators.activateCheckbox.click();
        }

        await this.buttons.submit.click();
    }
}