import { expect, Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  frame = () => this.page.frameLocator('iframe[src*="elements-inner-accessory-target"]');
  cardNumber = () => this.frame().locator('#payment-numberInput');
  expiry = () => this.frame().locator('#payment-expiryInput');
  cvv = () => this.frame().locator('#payment-cvcInput');
  zip = () => this.frame().locator('#payment-postalCodeInput');

  continueButton = () => this.page.locator('[data-test="submit"]');

  /*
    Simulate the payment process by filling in the card details and submitting the form.
  */
  async pay() {
    await this.page.waitForTimeout(2000);
    await this.continueButton().click();
    await expect(this.cardNumber()).toBeVisible();
    await this.cardNumber().fill('4242424242424242');
    await this.expiry().fill('12/34');
    await this.cvv().fill('123');
    await this.zip().fill('12345');
    await this.continueButton().click();
  }
}