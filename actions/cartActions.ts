import { expect, Page } from "@playwright/test";
import { generalPage } from "../data/pageObjects/generalPage";
import { cartPage } from "../data/pageObjects/cartPage";

export async function deleteCart(page: Page) { //deletes all items in cart
    await page.locator(generalPage.btnCartOpen).click();
    await page.waitForLoadState('networkidle');

    while (await page.locator(cartPage.btnRemoveFromCart).count() > 0) {
        const countBefore = await page.locator(cartPage.btnRemoveFromCart).count();
        await page.locator(cartPage.btnRemoveFromCart).first().click();
        await expect(page.locator(cartPage.btnRemoveFromCart)).toHaveCount(countBefore - 1);
}
    }   