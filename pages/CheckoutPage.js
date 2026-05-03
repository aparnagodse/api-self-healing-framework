import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async isLoaded() {
    return await this.firstNameInput.isVisible();
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async continueCheckout() {
    await this.click(this.continueButton);
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}