import { test, expect } from '@playwright/test';
import { acceptCookies } from '../actions/cookieActions';
import { generalPage } from '../data/pageObjects/generalPage';
import { toastTexts } from '../data/staticData/toasts/toastTexts';
import { cartPage } from '../data/pageObjects/cartPage';
import { deleteCart } from '../actions/cartActions';
import { cartInfo } from '../data/staticData/cartData/cartInfo';

test.describe('Checkout Flow', () => {

test.afterEach(async ({ page }) => {
    await deleteCart(page);
  });

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
    await page.waitForLoadState('networkidle');
    await page.locator(cartPage.btnPpl).click();
    await page.locator(cartPage.btnCOD).click();

    //select different shipping and payment method
    await page.locator(cartPage.btnPpl).click();
    await page.locator(cartPage.btnGls).click();  
    await page.locator(cartPage.btnCOD).click();
    await page.locator(cartPage.btnCard).click();
    await page.locator(cartPage.btnPaperPack).click();

    //check it the other options are not available and proceed to the next step of checkout
    await expect(page.locator(cartPage.btnPpl)).toBeHidden();
    await expect(page.locator(cartPage.btnCOD)).toBeHidden();
    await page.locator(cartPage.btnCheckout).click();

    //check fields and values for the last step of checkout
    await expect(page.locator(cartPage.inpEmail)).toBeVisible();
    await expect(page.locator(cartPage.inpFirstName).first()).toBeVisible();
    await expect(page.locator(cartPage.inpLastName).first()).toBeVisible();
    await expect(page.locator(cartPage.inpPhone)).toBeVisible();
    await expect(page.locator(cartPage.inpStreet).first()).toBeVisible();
    await expect(page.locator(cartPage.inpCity).first()).toBeVisible();
    await expect(page.locator(cartPage.inpZip).first()).toBeVisible();
    await expect(page.locator(cartPage.txtDeliveryMethod).last()).toContainText(cartInfo.gls);
    await expect(page.locator(cartPage.txtPaymentMethod).last()).toContainText(cartInfo.card);
    await expect(page.locator(cartPage.txtDeliveryAddon).last()).toContainText(cartInfo.paperPack);
    }) 
});