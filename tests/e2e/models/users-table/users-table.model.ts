import { Page, Locator, expect } from '@playwright/test';
import { NavigationPaths, navigationService } from '../../services/navigation.service';
import { UserData } from '../user-creator/user-creator.model';
import { todaysDate } from '../../utils/date.utils';
import { setText } from '../../utils/input.utils';

export class UsersHeader {
  readonly page: Page;
  readonly headerLocator: Locator;

  readonly inputs: {
    searchInput: Locator
  };

  readonly locators: {
    previousPageButton: Locator
    nextPageButton: Locator
    pageItemsSelect: Locator
    addUserButton: Locator
    logoutButton: Locator
  };

  constructor(page: Page) {
    this.page = page;
    this.headerLocator = this.page.locator('#users-table-header');

    this.inputs = {
        searchInput: this.headerLocator.locator('#search-input'),
      };

    this.locators = {
        previousPageButton: this.headerLocator.locator('#pagination-prev-button'),
        nextPageButton: this.headerLocator.locator('#pagination-next-button'),
        pageItemsSelect: this.headerLocator.locator('#pagination-page-items'),
        addUserButton: this.headerLocator.locator('#add-user-button'),
        logoutButton: this.headerLocator.locator('#user-table-header-logout-button'),
    }
  };

  async searchByEmail(email: string) {
    await setText(this.inputs.searchInput, email);
  }

  async logOut() {
    await navigationService.navigateTo(this.page, NavigationPaths.USER_TABLE);
    await this.locators.logoutButton.click();
  }
};

export class UsersTable extends UsersHeader {
  readonly page: Page;
  readonly tableLocator: Locator

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.tableLocator = this.page.locator('#users-table');
  }

  async isTableVisible(isVisible: boolean = true) {
    isVisible ? await expect(this.tableLocator).toBeVisible() : await expect(this.tableLocator).not.toBeVisible();
  }

  async getRowByEmail(userEmail: string): Promise<UsersTableRow> {
    await this.searchByEmail(userEmail);
    await expect(this.tableLocator.locator('#table-user-row').filter({ hasText: userEmail})).toBeVisible();
    return new UsersTableRow(this.tableLocator.locator('#table-user-row').filter({ hasText: userEmail}));
  }
}

export class UsersTableRow {
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
      checkbox: this.userRow.locator('#user-row-checkbox'),
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
      activation: this.userRow.locator('table-user-row-deactivate-button'),
    }
  }

  async checkUserData(userData: UserData) {
    expect(this.userData.name).toHaveText(userData.name + ' ' + userData.surname);
    expect(this.userData.email).toHaveText(userData.email);

    userData.phoneNumber ? expect(this.userData.phoneNumber).toHaveText(userData.phoneNumber) : expect(this.userData.phoneNumber).toHaveText('');
    userData.contract?.type ? expect(this.userData.contractType).toHaveText(userData.contract.type) : expect(this.userData.contractType).toHaveText('');
    userData.contract?.startTime ? expect(this.userData.startTime).toHaveText(userData.contract.startTime) : expect(this.userData.startTime).toHaveText('');
    userData.contract?.endTime ? expect(this.userData.endTime).toHaveText(userData.contract.endTime) : expect(this.userData.endTime).toHaveText('');
    userData.contract?.position ? expect(this.userData.position).toHaveText(userData.contract.position) : expect(this.userData.position).toHaveText('');

    userData.isActivated ? expect(this.userData.status).toHaveClass('text-success') : expect(this.userData.status).toHaveClass('text-danger');
    expect(this.userData.lastUpdated).toContainText(todaysDate());
  }
}