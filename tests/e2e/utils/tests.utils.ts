import { Page } from "@playwright/test";
import { LoginPage } from "../models/login-page/login-page.model";
import { createUserByApi } from "./users.utils";
import { UsersTable } from "../models/users-table/users-table.model";

export async function performTestInitialization(page: Page) {
    const loginPage = new LoginPage(page);

    const userData = await createUserByApi(true, true);
    await loginPage.openLoginPageAndLogin(userData.email, userData.password);

    return userData;
}

export async function logoutAndLogin(page: Page, email: string, password: string) {
    const usersTable = new UsersTable(page);
    const loginPage = new LoginPage(page);

    await usersTable.logOut();
    await loginPage.login(email, password);
}