import { expect, Page } from '@playwright/test';

export class SchedulePage {
  constructor(private page: Page) {}

  stateDropdown = () => this.page.getByRole('combobox');
  floridaOption = () => this.page.getByRole('option', { name: 'Florida' });
  aventuraFacility = () => this.page.locator('.location-card').filter({
      has: this.page.getByText('Aventura', { exact: true })
        });

  calendarDay = (month: number, day: number) =>
  this.page.getByTestId(`${month}-${day}-cal-day-content`);

  timeSlot = (index: number) =>
  this.page
    .locator('.appointments__individual-appointment')
    .filter({ visible: true })
    .nth(index);

  understandButton = () => this.page.getByRole('button', { name: 'I understand' });
  continueButton = () => this.page.locator('[data-test="submit"]');

  /*
    Schedule an appointment by selecting state, facility, date, and time slot.
  */
  async schedule() {
    await this.stateDropdown().click();
    await this.floridaOption().click();
    await this.page.waitForTimeout(1000);
    await expect(this.aventuraFacility()).toBeVisible();
    await this.aventuraFacility().click();
    await this.calendarDay(6, 27).scrollIntoViewIfNeeded();
    await expect(this.calendarDay(6, 27)).toBeVisible({ timeout: 10000 });
    await this.calendarDay(6, 27).click();
    await expect(this.timeSlot(1)).toBeVisible();
    await this.timeSlot(1).click();
    await this.understandButton().click();
    await expect(this.timeSlot(2)).toBeVisible();
    await this.timeSlot(2).click();
    await expect(this.timeSlot(3)).toBeVisible();
    await this.timeSlot(3).click();
    await this.continueButton().click();
  }
}