import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  emailInput = () => this.page.locator('#email');
  passwordInput = () => this.page.locator('#password');
  loginButton = () => this.page.locator('button.submit-btn');
  acceptCookiesButton = () =>
  this.page.getByRole('button', { name: 'Accept' });

  /*
    Accept cookies by clicking the "Accept" button, and wait for the button to disappear.
  */
  async acceptCookies() {
    await expect(this.acceptCookiesButton()).toBeVisible({ timeout: 10000 });
    await this.acceptCookiesButton().click();
  }

  /*
    Login as a user with the provided email and password, then wait for the page to load completely.
  */
  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.page.waitForLoadState('load');
  }
}