import { expect, Locator, Page } from "@playwright/test";
import { UserData } from "../user-creator/user-creator.model";
import { todaysDate } from "../../utils/date.utils";
import { navigationService } from "../../services/navigation.service";

export enum OtherOptions {
    Yes = 'Yes',
    No = 'No',
    NoData = '-',
}

export class UserDetails {
    readonly page: Page
    readonly userDetailsLocator: Locator

    readonly userDataLocators: {
        name: Locator
        surname: Locator,
        email: Locator
        phoneNumber: Locator
        birthDate: Locator
        contractType: Locator
        salary: Locator
        position: Locator
        startTime: Locator
        endTime: Locator
        notes: Locator
        admin: Locator
        activated: Locator
        lastUpdated: Locator
    }

    readonly locators: {
        backButton: Locator
    }

    constructor(page: Page) {
        this.page = page;
        this.userDetailsLocator = this.page.locator('#user-details-form');

        this.userDataLocators = {
            name: this.userDetailsLocator.locator('#user-details-name'),
            surname: this.userDetailsLocator.locator('#user-details-surname'),
            email: this.userDetailsLocator.locator('#user-details-email'),
            phoneNumber: this.userDetailsLocator.locator('#user-details-phone-number'),
            birthDate: this.userDetailsLocator.locator('#user-details-birth-date'),
            contractType: this.userDetailsLocator.locator('#user-details-contract-type'),
            salary: this.userDetailsLocator.locator('#user-details-salary'),
            position: this.userDetailsLocator.locator('#user-details-position'),
            startTime: this.userDetailsLocator.locator('#user-details-start-time'),
            endTime: this.userDetailsLocator.locator('#user-details-end-time'),
            notes: this.userDetailsLocator.locator('#user-details-notes'),
            admin: this.userDetailsLocator.locator('#user-details-admin'),
            activated: this.userDetailsLocator.locator('#user-details-activated'),
            lastUpdated: this.userDetailsLocator.locator('#user-details-last-updated'),
        }

        this.locators = {
            backButton: this.userDetailsLocator.locator('#back-button'),
        }
    }

    async isUserDetailsVisible(isVisible: boolean = true) {
        isVisible ? await expect(this.userDetailsLocator).toBeVisible() : await expect(this.userDetailsLocator).not.toBeVisible();
      }
    
    async checkUserData(userData: UserData) {
        await expect(this.userDataLocators.name).toContainText(userData.name);
        await expect(this.userDataLocators.surname).toContainText(userData.surname);
        await expect(this.userDataLocators.email).toContainText(userData.email);

        userData.phoneNumber ? await expect(this.userDataLocators.phoneNumber).toContainText(userData.phoneNumber) : await expect(this.userDataLocators.phoneNumber).toContainText(OtherOptions.NoData);
        userData.birthDate ? await expect(this.userDataLocators.birthDate).toContainText(userData.birthDate) : await expect(this.userDataLocators.birthDate).toContainText(OtherOptions.NoData);
        userData.contract?.type ? await expect(this.userDataLocators.contractType).toContainText(userData.contract.type) : await expect(this.userDataLocators.contractType).toContainText(OtherOptions.NoData);
        userData.contract?.salary ? await expect(this.userDataLocators.salary).toContainText(userData.contract.salary) : await expect(this.userDataLocators.salary).toContainText(OtherOptions.NoData);
        userData.contract?.position ? await expect(this.userDataLocators.position).toContainText(userData.contract.position) : await expect(this.userDataLocators.position).toContainText(OtherOptions.NoData);
        userData.contract?.startTime ? await expect(this.userDataLocators.startTime).toContainText(userData.contract.startTime) : await expect(this.userDataLocators.startTime).toContainText(OtherOptions.NoData);
        userData.contract?.endTime ? await expect(this.userDataLocators.endTime).toContainText(userData.contract.endTime) : await expect(this.userDataLocators.endTime).toContainText(OtherOptions.NoData);
        userData.notes ? await expect(this.userDataLocators.notes).toContainText(userData.notes) : await expect(this.userDataLocators.notes).toContainText(OtherOptions.NoData);

        userData.isAdmin ? await expect(this.userDataLocators.admin).toContainText(OtherOptions.Yes) : await expect(this.userDataLocators.admin).toContainText(OtherOptions.No);
        userData.isActivated ? await expect(this.userDataLocators.activated).toContainText(OtherOptions.Yes) : await expect(this.userDataLocators.activated).toContainText(OtherOptions.No);

        await expect(this.userDataLocators.lastUpdated).toContainText(todaysDate());
    }    
}