import { Page, Locator } from '@playwright/test';

export class UsersTable {
  readonly page: Page;

  readonly locators: {
    searchInput: Locator
    addUser: Locator
  };

  readonly pagination: {
    previousButton: Locator
    nextButton: Locator
    itemsSelect: Locator
  }


  constructor(page: Page) {
    this.page = page;

    this.locators = {
        searchInput: this.page.locator('#search-input'),
        addUser: this.page.locator('xd'),
      };
  }
}
