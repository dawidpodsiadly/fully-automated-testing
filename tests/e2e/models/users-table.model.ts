import { Page, Locator } from '@playwright/test';

export class UsersHeader {
  readonly page: Page;

  readonly locators: {
    searchInput: Locator
    addUser: Locator
  };

  readonly pagination: {
    previousButton: Locator
    nextButton: Locator
    itemsSelect: Locator
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
        searchInput: this.page.locator('#search-input'),
        addUser: this.page.locator('#add-user-button'),
      };

    this.pagination = {
        previousButton: this.page.locator('#pagination-prev-button'),
        nextButton: this.page.locator('#pagination-next-button'),
        itemsSelect: this.page.locator('#pagination-page-items'),
    }
  };
};

export class UsersTable {
  readonly page: Page;
  readonly tablePage: Locator

  constructor(page: Page) {
    this.page = page;
    this.tablePage = this.page.locator('#users-table');
  }

  async getRowByEmail(userEmail: string): Promise<UsersTableRow> {
    return new UsersTableRow(this.tablePage.locator('#table-user-row').filter({ hasText: userEmail}));
  }  
}

export class UsersTableRow {
  readonly userRowPage: Locator;

  readonly actions: {
    update: Locator
    delete: Locator
  }

  constructor(pageLocator: Locator) {
    this.userRowPage = pageLocator;

    this.actions = {
      update: this.userRowPage.locator('#table-user-row-update-button'),
      delete: this.userRowPage.locator('#table-user-row-delete-button'),
    }
  }
}
