import { test, expect } from '@playwright/test';
import { acceptCookies } from '../actions/cookieActions';
import { generalPage } from '../data/pageObjects/generalPage';


test('should search for a product and check its details are shown', async ({ page }) => {
    await page.goto('/');
    await acceptCookies(page);

    //add product to cart and check the quantity is correct
    await page.locator(generalPage.txtProductModule).first().scrollIntoViewIfNeeded();
    await page.locator(generalPage.btnProduct).first().hover();
    await page.locator(generalPage.btnAddToCart).first().click();
}) 