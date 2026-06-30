import { test, expect } from '@playwright/test';
import { acceptCookies } from '../actions/cookieActions';
import { generalPage } from '../data/pageObjects/generalPage';
import { toastTexts } from '../data/staticData/toasts/toastTexts';
import { cartPage } from '../data/pageObjects/cartPage';
import { vouchers } from '../data/staticData/codes/vouchers';

test('should add some product to cart and check cart operations and content', async ({ page }) => {
    await page.goto('/');
    await acceptCookies(page);

    //shoud add one product to cart and then a second one in quantity of 2 
    await page.locator(generalPage.txtProductModule).first().scrollIntoViewIfNeeded();
    await page.locator(generalPage.btnProduct).first().hover();
    await page.locator(generalPage.btnAddToCart).first().click();
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.cartAddItem);
    await page.locator(generalPage.btnProduct).nth(1).hover();
    await page.locator(generalPage.btnAddToCart).first().click();
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.cartAddItem);
    await page.locator(generalPage.btnCartPlus).nth(1).click();
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.cartChangeQuantity); 

    //open cart and check the quantity of products is correct
    await page.locator(generalPage.btnCartOpen).click();
    await expect(page.locator(generalPage.inpCartQuantity).first()).toHaveValue('1');
    await expect(page.locator(generalPage.inpCartQuantity).nth(1)).toHaveValue('2');

    //apply discount
    await page.waitForLoadState('networkidle');
    await page.locator(cartPage.btnDiscount).click();
    await page.locator(cartPage.btnDiscountType).click();
    await page.locator(cartPage.btnDiscountSelect).filter({ hasText: vouchers.voucherSelectText }).click();
    await page.locator(cartPage.inpDiscountCode).fill(vouchers.voucher100);
    await page.locator(cartPage.btnDiscountConfirm).click();
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.cartAddCode, { timeout: 15000 });

    //remove the first product from cart and add one more of the second product
    await page.locator(cartPage.btnRemoveFromCart).first().click();
    await expect(page.locator(generalPage.btnCartPlus)).toHaveCount(1);
    await page.locator(generalPage.btnCartPlus).click();
    await expect(page.locator(generalPage.inpCartQuantity)).toHaveValue('3');
})  