import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  confirmationText = () =>
    this.page.getByText('Your requested time slots have been received.');

  /*
    Verify that the confirmation message is displayed after booking an MRI scan.
  */
  async verify() {
    await expect(this.confirmationText()).toBeVisible();
    await expect(this.confirmationText())
      .toContainText('Your requested time slots have been received.');
  }
}