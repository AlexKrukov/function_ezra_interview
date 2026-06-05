import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  bookScanButton = () => this.page.getByRole('button', { name: 'Book a scan' });

  /*
    Press the "Book a scan" button on the dashboard page, which navigates the user to the booking flow.
  */
  async goToBooking() {
    await this.bookScanButton().click();
  }
}