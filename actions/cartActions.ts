import { expect, Page } from "@playwright/test";
import { generalPage } from "../data/pageObjects/generalPage";
import { cartPage } from "../data/pageObjects/cartPage";
import { cartInfo } from "../data/staticData/cartData/cartInfo";

export async function deleteCart(page: Page) { //deletes all items in cart
    await page.locator(generalPage.btnCartOpen).click();
    await page.waitForLoadState('networkidle');

    if(await page.locator(cartPage.btnMoreOptions).isVisible()){
        await page.locator(cartPage.btnMoreOptions).click();
        await page.locator(cartPage.btnRemoveAllItems).click();
        await expect(page.locator(cartPage.txtEmptyCart)).toContainText(cartInfo.emptyCart);
        }      
    }   