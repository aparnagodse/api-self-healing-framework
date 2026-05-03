import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async clickCheckout() {
    await this.click(this.checkoutButton);
  }
}