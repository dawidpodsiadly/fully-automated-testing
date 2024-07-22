import { expect, Locator, Page } from "@playwright/test";
import { NavigationPaths, navigationService } from "../../services/navigation.service";

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

    async expectUnauthorizedPage() {
        await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.UNAUTHORIZED));
        await expect(this.locators.unauthorizedText).toBeVisible();
    }
}