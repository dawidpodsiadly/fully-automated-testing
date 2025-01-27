import {Page, Locator, expect} from '@playwright/test';
import { UserHeader } from './inner_models/user-table-header.model';
import { UserTableRow } from './inner_models/user-table-row.model';
import { clearText } from '../../utils/input.utils';

export class UserTable {
  readonly page: Page;
  readonly userHeader: UserHeader;

  readonly mainLocator: Locator;

  readonly locators: {
    deleteSelectedUsers: Locator;
    previousPageButton: Locator;
    nextPageButton: Locator;
    pageItemsSelect: Locator;
  };

  readonly deleteUserModal: {
    delete: Locator;
    cancel: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.userHeader = new UserHeader(page);

    this.mainLocator = this.page.locator('#users-table');

    this.locators = {
      deleteSelectedUsers: this.page.locator('#user-table-delete-selected-users-button'),
      previousPageButton: this.page.locator('#pagination-prev-button'),
      nextPageButton: this.page.locator('#pagination-next-button'),
      pageItemsSelect: this.page.locator('#pagination-page-items'),
    };

    this.deleteUserModal = {
      delete: this.page.locator('#delete-modal-delete-button'),
      cancel: this.page.locator('#delete-modal-delete-button'),
    };
  }

  async logout() {
    await this.userHeader.buttons.logoutButton.click();
  }

  async searchByEmail(email: string) {
    await clearText(this.userHeader.inputs.searchInput);
    await this.userHeader.inputs.searchInput.pressSequentially(email);
  }

  async getRowByEmail(userEmail: string): Promise<UserTableRow> {
    const maxAttempts = 3;
    const waitTime = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await this.searchByEmail(userEmail);
      const userRow = this.mainLocator.locator('#table-user-row').filter({hasText: userEmail});

      if ((await userRow.count()) > 0) {
        return new UserTableRow(userRow);
      }

      if (attempt < maxAttempts) {
        await this.page.waitForTimeout(waitTime);
        await this.page.reload({waitUntil: 'networkidle'});
      }
    }
    throw new Error(`Could not find User with email: ${userEmail} after ${maxAttempts} attempts.`);
  }

  async isVisible(isVisible = true) {
    isVisible ? await expect(this.mainLocator).toBeVisible() : await expect(this.mainLocator).not.toBeVisible();
  }
}
