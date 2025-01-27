import {expect, Locator, Page} from '@playwright/test';
import {NavigationPaths, navigationService} from '../../services/navigation.service';
import {setText} from '../../utils/input.utils';

export class LoginPage {
  readonly page: Page;
  readonly mainLocator: Locator;

  readonly inputs: {
    email: Locator;
    password: Locator;
  };

  readonly locators: {
    loginButton: Locator;
  };

  readonly errors: {
    invalidCredentials: Locator;
    deactivatedAccount: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.mainLocator = this.page.locator('form');

    this.inputs = {
      email: this.mainLocator.locator('#email'),
      password: this.mainLocator.locator('#password'),
    };

    this.locators = {
      loginButton: this.mainLocator.locator('button[type="submit"]'),
    };

    this.errors = {
      invalidCredentials: this.mainLocator.locator('p.text-danger', {hasText: 'Invalid email or password.'}),
      deactivatedAccount: this.mainLocator.locator('p.text-danger', {hasText: 'Your account has been deactivated. Please contact your administrator.'}),
    };
  }

  async login(email: string, password: string) {
    await setText(this.inputs.email, email);
    await setText(this.inputs.password, password);
    await this.locators.loginButton.click();
  }

  async expectToBeLoggedIn(isLogged = true) {
    isLogged
      ? await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.USER_TABLE))
      : await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.LOGIN));
    isLogged 
      ? await expect(this.mainLocator).not.toBeVisible() 
      : await expect(this.mainLocator).toBeVisible();
  }
}
