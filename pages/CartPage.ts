import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly yourCartTitle: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yourCartTitle = page.getByText('Your Cart');
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'});
    }

    getCartTitleLocator() {
        return this.yourCartTitle;
    }
}