import { Locator } from "@playwright/test";

export async function clearText(locator: Locator) {
    const page = locator.page();
    
    await locator.click();
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
}

export async function setText(locator: Locator, value: string) {
    await clearText(locator);
    await locator.fill(value);
}