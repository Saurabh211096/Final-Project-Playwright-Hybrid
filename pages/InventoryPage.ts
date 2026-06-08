import test, { Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';

export class InventoryPage {
    // Encapsulating our variables
    readonly page: Page;
    readonly productsTitle: Locator;
    readonly cartIcon: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    // Action
    getProductsTitleLocator() {
        return this.productsTitle;
    }
    async clickCartIcon() {
        await this.cartIcon.click();
        return new CartPage(this.page);
    }
}