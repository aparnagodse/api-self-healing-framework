import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    this.inventoryList = page.locator('.inventory_list');
    this.backpackAddToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.bikeLightAddToCartButton = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async isLoaded() {
    return await this.inventoryList.isVisible();
  }

  async addBackpackToCart() {
    await this.click(this.backpackAddToCartButton);
  }

  async addBikeLightToCart() {
    await this.click(this.bikeLightAddToCartButton);
  }

  async openCart() {
    await this.click(this.cartLink);
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}