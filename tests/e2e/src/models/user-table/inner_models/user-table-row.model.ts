import {Locator, expect} from '@playwright/test';
import {CreateUserData} from '../../user-creator/user-creator.model';
import {todaysDate} from '../../../utils/date.utils';

export class UserTableRow {
  readonly mainLocator: Locator;

  readonly userData: {
    checkbox: Locator;
    status: Locator;
    name: Locator;
    email: Locator;
    phoneNumber: Locator;
    contractType: Locator;
    startTime: Locator;
    endTime: Locator;
    position: Locator;
    lastUpdated: Locator;
  };

  readonly actions: {
    update: Locator;
    delete: Locator;
    activation: Locator;
  };

  constructor(userRow: Locator) {
    this.mainLocator = userRow;

    this.userData = {
      checkbox: this.mainLocator.locator('#user-row-checkbox input'),
      status: this.mainLocator.locator('#user-row-status span'),
      name: this.mainLocator.locator('#user-name-and-surname'),
      email: this.mainLocator.locator('#user-row-email'),
      phoneNumber: this.mainLocator.locator('#user-row-phone-number'),
      contractType: this.mainLocator.locator('#user-row-contract-type'),
      startTime: this.mainLocator.locator('#user-row-start-time'),
      endTime: this.mainLocator.locator('#user-row-end-time'),
      position: this.mainLocator.locator('#user-row-position'),
      lastUpdated: this.mainLocator.locator('#user-row-last-updated'),
    };

    this.actions = {
      update: this.mainLocator.locator('#table-user-row-update-button'),
      delete: this.mainLocator.locator('#table-user-row-delete-button'),
      activation: this.mainLocator.locator('#table-user-row-deactivate-button'),
    };
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
    isVisible ? await expect(this.mainLocator).toBeVisible() : await expect(this.mainLocator).not.toBeVisible();
  }
}