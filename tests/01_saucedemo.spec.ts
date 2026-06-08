import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Successful login to SauceDemo (raw way)', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
});

// const loginData = [
//     {username: 'standard_user', password: 'secret_sauce'},
//     {username: 'problem_user', password: 'secret_sauce'},
//     {username: 'visual_user', password: 'secret_sauce'}
// ];

for (const data of loginData) {
    test(`Successful login using POM for user: ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = await loginPage.loginToApplication(data.username, data.password);
        // const titleLocator = inventoryPage.getProductsTitleLocator();
        // await expect(titleLocator).toBeVisible();
        await expect(inventoryPage.getProductsTitleLocator()).toBeVisible();
        const cartPage = await inventoryPage.clickCartIcon();
        await expect(cartPage.getCartTitleLocator()).toBeVisible();
    })
}

test('Successful login to SauceDemo using page chaining and assertion (POM way)',
     async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = 
    await loginPage.loginToApplication('standard_user', 'secret_sauce');
    const titleLocator = inventoryPage.getProductsTitleLocator();
    await expect(titleLocator).toBeVisible();
});