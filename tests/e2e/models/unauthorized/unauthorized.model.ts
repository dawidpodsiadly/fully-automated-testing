import { expect, Locator, Page } from "@playwright/test";

export class UnauthorizedView {
    readonly page: Page
    readonly unauthorizedLocator: Locator

    readonly locators: {
        unauthorizedText: Locator
    }

    constructor(page: Page) {
        this.page = page;
        this.unauthorizedLocator = this.page.locator('#unauthrozied-view');

        this.locators = {
            unauthorizedText: this.unauthorizedLocator.locator('#unauthrozied-view-text'),
        }
    }

    async isVisible(isVisible = true) {
        isVisible ? await expect(this.locators.unauthorizedText).toBeVisible() : await expect(this.locators.unauthorizedText).not.toBeVisible();
    }
}