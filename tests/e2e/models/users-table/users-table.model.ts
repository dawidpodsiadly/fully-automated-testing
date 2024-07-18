import { Page, Locator, expect } from '@playwright/test';
import { NavigationPaths, navigationPaths, navigationService } from '../../services/navigation.service';

export class UsersHeader {
  readonly page: Page;

  readonly inputs: {
    searchInput: Locator
  };

  readonly locators: {
    previousPageButton: Locator
    nextPageButton: Locator
    pageItemsSelect: Locator
    addUserButton: Locator
  };

  constructor(page: Page) {
    this.page = page;

    this.inputs = {
        searchInput: this.page.locator('#search-input'),
      };

    this.locators = {
        previousPageButton: this.page.locator('#pagination-prev-button'),
        nextPageButton: this.page.locator('#pagination-next-button'),
        pageItemsSelect: this.page.locator('#pagination-page-items'),
        addUserButton: this.page.locator('#add-user-button'),
    }
  };
};

export class UsersTable {
  readonly page: Page;
  readonly tableLocator: Locator

  constructor(page: Page) {
    this.page = page;
    this.tableLocator = this.page.locator('#users-table');
  }

  async isTableVisible(isVisible: boolean = false) {
    await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.USER_TABLE));
    isVisible ? await expect(this.tableLocator).toBeVisible() : await expect(this.tableLocator).not.toBeVisible();
  }

  async getRowByEmail(userEmail: string): Promise<UsersTableRow> {
    return new UsersTableRow(this.tableLocator.locator('#table-user-row').filter({ hasText: userEmail}));
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