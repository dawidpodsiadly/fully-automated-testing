import {Page, Locator} from '@playwright/test';

export class UserHeader {
  readonly page: Page;
  readonly mainLocator: Locator;

  readonly inputs: {
    searchInput: Locator;
  };

  readonly buttons: {
    addUserButton: Locator;
    logoutButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.mainLocator = this.page.locator('#users-table-header');

    this.inputs = {
      searchInput: this.mainLocator.locator('#search-input'),
    };

    this.buttons = {
      addUserButton: this.mainLocator.locator('#add-user-button'),
      logoutButton: this.mainLocator.locator('#logout-button'),
    };
  }
}