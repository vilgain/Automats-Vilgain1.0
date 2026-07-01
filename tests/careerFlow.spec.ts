import { test, expect } from '@playwright/test'
import { urls } from '../data/urls/urls';
import { acceptCookies } from '../actions/cookieActions';

test('Career flow', async ({ page }) => {  
    await page.goto(urls.career);
    await acceptCookies(page);

    //
    })