import { test, expect } from '@playwright/test';
import { acceptCookies } from '../actions/cookieActions';
import { generalPage } from '../data/pageObjects/generalPage';
import { productNames } from '../data/staticData/product/productNames';
import { pdpPage } from '../data/pageObjects/pdpPage';

test('should search for a product and check its details are shown', async ({ page }) => {
    await page.goto('/');
    await acceptCookies(page);

    //search for a product and check its pdp is shown
    await page.locator(generalPage.inpProductSearch).pressSequentially(productNames.vilgainSirupShort);
    await expect(page.locator(generalPage.txtSearchResult).first()).toBeVisible();
    await page.locator(generalPage.txtSearchResult).first().click();
    await expect(page.locator(pdpPage.txtProductName).last()).toHaveText(productNames.vilgainSirupLong);
    
    //search for a product via cathegory and check its pdp is shown
    await page.locator(generalPage.btnHealthyNutrition).click();
    await page.locator(generalPage.btnGeneralSubcategory).first().click();
    await page.locator(generalPage.btnProduct).first().click();
    await expect(page.locator(pdpPage.txtProductName).last()).toBeVisible();
})  