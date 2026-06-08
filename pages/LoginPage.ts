import { Page, Locator } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";

export class LoginPage {
    // Variables
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    // Actions
    async loginToApplication(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
        // page chaining - We hand the 'page' remote control to the new InventoryPage!
        return new InventoryPage(this.page);
    }
}