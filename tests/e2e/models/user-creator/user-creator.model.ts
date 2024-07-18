import { Page, Locator, expect } from '@playwright/test';
import { setText } from '../../utils/input.utils'

export class CreateUserForm {
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
      this.formLocator = this.page.locator('#create-user-form');

    this.inputs = {
        nameInput: this.formLocator.locator('#create-user-form-name'),
        emailInput: this.formLocator.locator('#create-user-form-email'),
        ageInput: this.formLocator.locator('#create-user-form-age'),
        notesInput: this.formLocator.locator('#create-user-form-notes'),
        activateCheckbox: this.formLocator.locator('#create-user-form-is-activated'),
      };

    this.locators = {
        submit: this.formLocator.locator('#create-user-form-submit-button'),
        cancel: this.formLocator.locator('#create-user-form-cancel-cutton'),
      };
    }

    async submitForm() {
        await this.locators.submit.click();
    }

    async checkErrors(errorsNumber: number) {
        await expect(this.formLocator.locator('.text-danger')).toHaveCount(errorsNumber);
    }

    async fillForm(name: string, email: string, isActivated: boolean, age: string, notes: string) {

        await setText(this.inputs.nameInput, name);
        await setText(this.inputs.emailInput, email);
        await setText(this.inputs.ageInput, age);
        await setText(this.inputs.notesInput, notes);

        const isChecked = await this.inputs.activateCheckbox.isChecked();
        if (isChecked !== isActivated) {
            await this.inputs.activateCheckbox.click();
        }

        await this.locators.submit.click();
    }
}