import { Page } from '@playwright/test';
import { generalPage } from '../data/pageObjects/generalPage';
import { accountPage } from '../data/pageObjects/accountPage';

export async function deleteLoggedUser(page: Page) { //deletes the currently logged user
    await page.goto('/');
    await page.locator(generalPage.btnUserInfo).waitFor({ state: 'visible' });
    await page.locator(generalPage.btnUserInfo).click();
    await page.locator(generalPage.btnUserSettings).waitFor({ state: 'visible' });
    await page.locator(generalPage.btnUserSettings).click();
    await page.locator(accountPage.btnDeleteAccount).scrollIntoViewIfNeeded();
    await page.locator(accountPage.btnDeleteAccount).click();
    await page.locator(accountPage.btnDeleteConfirm).click(); 
    await page.locator(accountPage.btnDeleteSubmit).click();  
    }