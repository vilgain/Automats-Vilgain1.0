import { test, expect } from '@playwright/test';
import { acceptCookies } from '../actions/cookieActions';
import { generalPage } from '../data/pageObjects/generalPage';
import { toastTexts } from '../data/staticData/toasts/toastTexts';
import { cartPage } from '../data/pageObjects/cartPage';


test('should search for a product and check its details are shown', async ({ page }) => {
    await page.goto('/');
    await acceptCookies(page);

    //add product to cart and check the quantity is correct
    await page.locator(generalPage.txtProductModule).first().scrollIntoViewIfNeeded();
    await page.locator(generalPage.btnProduct).first().hover();
    await page.locator(generalPage.btnAddToCart).first().click();
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.cartAddItem);
    await page.locator(generalPage.btnCartOpen).click();
    await expect(page.locator(generalPage.inpCartQuantity)).toHaveValue('1');

    //continue to the second step of checkout and select shipping and payment method
    await page.locator(cartPage.btnShipping).click();
    
}) 