import { test, expect } from '@playwright/test';
import { generalPage } from '../data/pageObjects/generalPage';
import { acceptCookies } from '../actions/cookieActions';

test.describe('Auth flow', () => {
  const randomId = new Date().getTime()

  const user = {
    email: `${randomId}@mustang.com`,
    password: '@aA123456789',
  }

test('should register and then login with new user', async ({ page }) => {
    await page.goto('/');
    await acceptCookies(page);

    //create a new user
    await page.locator(generalPage.btnLogin).click();   
    await page.locator(generalPage.btnSignUp).click();
    await page.fill(generalPage.inpSignUpEmail, test.info().project.name + user.email)
    await page.fill(generalPage.inpSignUpPassword, user.password)
    await page.locator(generalPage.btnSignUpTerms).click();
    await page.locator(generalPage.btnSignUpRegister).click();
    await expect(page.locator(generalPage.btnSignUpRegister)).not.toBeVisible();

    //check if user is logged in and log out
    await page.locator(generalPage.btnUserInfo).click();
    await expect(page.locator(generalPage.txtUserEmail)).toHaveText(test.info().project.name + user.email);
    await page.locator(generalPage.btnLogout).click();

    //check if user is logged out and log in with the same user
    await expect(page.locator(generalPage.btnUserInfo)).not.toBeVisible();
    await page.waitForLoadState('networkidle'); 
    await page.locator(generalPage.btnLogin).click();
    await page.fill(generalPage.inpLoginEmail, test.info().project.name + user.email)
    await page.fill(generalPage.inpLoginPassword, user.password)
    await page.locator(generalPage.btnLoginSubmit).click();
    await expect(page.locator(generalPage.btnLoginSubmit)).not.toBeVisible();

    //check if user is logged in
    await page.locator(generalPage.btnUserInfo).click();
    await expect(page.locator(generalPage.txtUserEmail)).toHaveText(test.info().project.name + user.email);
    })
}); 