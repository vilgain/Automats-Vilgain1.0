import { Page } from '@playwright/test';
import { generalPage } from '../data/pageObjects/generalPage';

export async function acceptCookies(page: Page) {
  await page.waitForLoadState('networkidle');
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('cookieModal') && resp.status() === 200),
    page.locator(generalPage.btnCookieAccept).click(),
  ]);
}