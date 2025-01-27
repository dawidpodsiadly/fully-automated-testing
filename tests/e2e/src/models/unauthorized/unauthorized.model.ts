import {expect, Locator, Page} from '@playwright/test';

export class UnauthorizedView {
  readonly page: Page;
  readonly mainLocator: Locator;

  readonly locators: {
    unauthorizedText: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.mainLocator = this.page.locator('#unauthrozied-view');

    this.locators = {
      unauthorizedText: this.mainLocator.locator('#unauthrozied-view-text'),
    };
  }

  async isVisible(isVisible = true) {
    isVisible
      ? await expect(this.locators.unauthorizedText).toBeVisible()
      : await expect(this.locators.unauthorizedText).not.toBeVisible();
  }
}
