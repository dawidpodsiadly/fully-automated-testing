import { Page } from "@playwright/test";
import { LoginPage } from "../models/login-page/login-page.model";
import { createUserByApi } from "./users.utils";

export async function performTestInitialization(page: Page) {
    const loginPage = new LoginPage(page);

    const userData = await createUserByApi(true, true);
    await loginPage.openLoginPageAndLogin(userData.email, userData.password);

    return userData;
}