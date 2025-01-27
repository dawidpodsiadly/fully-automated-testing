import {Locator} from '@playwright/test';

export async function clearText(locator: Locator) {
  await locator.clear();
}

export async function setText(locator: Locator, value: string) {
  await clearText(locator);
  await locator.fill(value);
}
