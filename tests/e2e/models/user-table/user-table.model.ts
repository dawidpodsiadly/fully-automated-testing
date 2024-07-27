import { Page, Locator, expect } from '@playwright/test';
import { NavigationPaths, navigationService } from '../../services/navigation.service';
import { CreateUserData } from '../user-creator/user-creator.model';
import { todaysDate } from '../../utils/date.utils';
import { clearText } from '../../utils/input.utils';

export class UsersHeader {
  readonly page: Page;
  readonly headerLocator: Locator;

  readonly inputs: {
    searchInput: Locator
  };

  readonly buttons: {
    addUserButton: Locator
    logoutButton: Locator
  };

  constructor(page: Page) {
    this.page = page;
    this.headerLocator = this.page.locator('#users-table-header');

    this.inputs = {
        searchInput: this.headerLocator.locator('#search-input'),
      };

    this.buttons = {
        addUserButton: this.headerLocator.locator('#add-user-button'),
        logoutButton: this.headerLocator.locator('#logout-button'),
    }
  };

  async searchByEmail(email: string) {
    await clearText(this.inputs.searchInput);
    await this.inputs.searchInput.pressSequentially(email);
  }

  async logOut() {
    await navigationService.navigateTo(this.page, NavigationPaths.USER_TABLE);
    await this.buttons.logoutButton.click();
  }
};

export enum PaginationItems {
  Five = '5',
  Ten = '10',
  Fifteen = '15',
}

export class UserTable extends UsersHeader {
  readonly page: Page;
  readonly tableLocator: Locator

  readonly locators: {
    deleteSelectedUsers: Locator
    previousPageButton: Locator
    nextPageButton: Locator
    pageItemsSelect: Locator
  }

    readonly deleteUserModal: {
    delete: Locator
    cancel: Locator
  }

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.tableLocator = this.page.locator('#users-table');

    this.locators = {
      deleteSelectedUsers: this.page.locator('#user-table-delete-selected-users-button'),
      previousPageButton: this.page.locator('#pagination-prev-button'),
      nextPageButton: this.page.locator('#pagination-next-button'),
      pageItemsSelect: this.page.locator('#pagination-page-items'),
    }

    this.deleteUserModal = {
      delete: this.page.locator('#delete-modal-delete-button'),
      cancel: this.page.locator('#delete-modal-delete-button'),
    }
  }

  async isVisible(isVisible: boolean = true) {
    isVisible ? await expect(this.tableLocator).toBeVisible() : await expect(this.tableLocator).not.toBeVisible();
  }

  async getRowByEmail(userEmail: string): Promise<UserTableRow> {
    const maxAttempts = 3;
    const waitTime = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await this.searchByEmail(userEmail);
        const userRow = this.tableLocator.locator('#table-user-row').filter({ hasText: userEmail });

        if (await userRow.count() > 0) {
            return new UserTableRow(userRow);
        }
        
        if (attempt < maxAttempts) {
            await this.page.waitForTimeout(waitTime);
            await this.page.reload({ waitUntil: 'networkidle' });
        }
    }
    throw new Error(`Could not find User with email: ${userEmail} after ${maxAttempts} attempts.`);
  }
}

export class UserTableRow {
  readonly userRow: Locator;

  readonly userData: {
    checkbox: Locator
    status: Locator
    name: Locator
    email: Locator
    phoneNumber: Locator
    contractType: Locator
    startTime: Locator
    endTime: Locator
    position: Locator
    lastUpdated: Locator
  }

  readonly actions: {
    update: Locator
    delete: Locator
    activation: Locator
  }

  constructor(userRow: Locator) {
    this.userRow = userRow;

    this.userData = {
      checkbox: this.userRow.locator('#user-row-checkbox input'),
      status: this.userRow.locator('#user-row-status span'),
      name: this.userRow.locator('#user-name-and-surname'),
      email: this.userRow.locator('#user-row-email'),
      phoneNumber: this.userRow.locator('#user-row-phone-number'),
      contractType: this.userRow.locator('#user-row-contract-type'),
      startTime: this.userRow.locator('#user-row-start-time'),
      endTime: this.userRow.locator('#user-row-end-time'),
      position: this.userRow.locator('#user-row-position'),
      lastUpdated: this.userRow.locator('#user-row-last-updated'),
    }

    this.actions = {
      update: this.userRow.locator('#table-user-row-update-button'),
      delete: this.userRow.locator('#table-user-row-delete-button'),
      activation: this.userRow.locator('#table-user-row-deactivate-button'),
    }
  }

  async checkUserData(userData: Partial<CreateUserData>) {    
    if (userData.name || userData.surname) await expect(this.userData.name).toHaveText(`${userData.name || ''} ${userData.surname || ''}`);
    if (userData.email !== undefined) await expect(this.userData.email).toHaveText(userData.email);

    await expect(this.userData.phoneNumber).toHaveText(userData.phoneNumber || '');
    await expect(this.userData.contractType).toHaveText(userData.contract?.type || '');
    await expect(this.userData.startTime).toHaveText(userData.contract?.startTime || '');
    await expect(this.userData.endTime).toHaveText(userData.contract?.endTime || '');
    await expect(this.userData.position).toHaveText(userData.contract?.position || '');
    await expect(this.userData.status).toHaveClass(userData.isActivated ? 'text-success' : 'text-danger');
    await expect(this.userData.lastUpdated).toContainText(todaysDate());
}

async goToUpdateUserView() {
  await this.actions.update.click();
}

  async isVisible(isVisible = true) {
    isVisible ? await expect(this.userRow).toBeVisible() : await expect(this.userRow).not.toBeVisible()
  }
}