import { expect, Locator, Page } from "@playwright/test";
import { NavigationPaths, navigationService } from "../../services/navigation.service";
import { setText } from "../../utils/input.utils";

export class LoginPage {
    readonly page: Page
    readonly loginLocator: Locator
    
    readonly inputs: {
        email: Locator
        password: Locator
    }

    readonly locators: {
        loginButton: Locator
    }

    readonly errors: {
        invalidCredentials: Locator
    }

    constructor(page: Page) {
        this.page = page;
        this.loginLocator = this.page.locator('form');

        this.inputs = {
            email: this.loginLocator.locator('#email'),
            password: this.loginLocator.locator('#password'),
        };

        this.locators = {
            loginButton: this.loginLocator.locator('button[type="submit"]'),
        }

        this.errors = {
            invalidCredentials: this.loginLocator.locator('p.text-danger', { hasText: 'Invalid email or password.'})
        }
    }

    async expectToBeLoggedIn(isLogged: boolean = true) {
        isLogged ? await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.USER_TABLE)) : await this.page.waitForURL(await navigationService.resolvePath(NavigationPaths.LOGIN))
        isLogged ? await expect(this.loginLocator).not.toBeVisible() : await expect(this.loginLocator).toBeVisible()
    }

    async openLoginPageAndLogin(email: string, password: string) {
        await navigationService.navigateTo(this.page, NavigationPaths.LOGIN);

        await setText(this.inputs.email, email);
        await setText(this.inputs.password, password);

        await this.locators.loginButton.click();
        await this.expectToBeLoggedIn();
    }
}