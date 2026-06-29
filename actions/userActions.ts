import { Page, expect } from '@playwright/test';
import { generalPage } from '../data/pageObjects/generalPage';
import { accountPage } from '../data/pageObjects/accountPage';
import { toastTexts } from '../data/staticData/toasts/toastTexts';

export async function deleteLoggedUser(page: Page) { //deletes the currently logged user
    await page.goto('/');
    await page.locator(generalPage.btnUserInfo).click();
    await page.locator(generalPage.btnUserSettings).click();
    await page.waitForLoadState('networkidle');
    await page.locator(accountPage.btnDeleteAccount).scrollIntoViewIfNeeded();
    await page.locator(accountPage.btnDeleteAccount).click();
    await page.locator(accountPage.btnDeleteConfirm).click(); 
    await page.locator(accountPage.btnDeleteSubmit).click();  
    await expect(page.locator(generalPage.txtToast)).toContainText(toastTexts.userDeleted);
    }   