import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PlanPage } from '../pages/PlanPage';
import { SchedulePage } from '../pages/SchedulePage';
import { PaymentPage } from '../pages/PaymentPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test.describe('MRI booking flow', () => {
  let login: LoginPage;
  let dashboard: DashboardPage;
  let plan: PlanPage;
  let schedule: SchedulePage;
  let payment: PaymentPage;
  let confirmation: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    plan = new PlanPage(page);
    schedule = new SchedulePage(page);
    payment = new PaymentPage(page);
    confirmation = new ConfirmationPage(page);

    await page.goto('/sign-in');
    await login.acceptCookies();
    await login.login(
      'alex.krukov.030@gmail.com',
      'AleksTest26!!'
    );
  });

  test('User can book MRI scan end-to-end', async () => {
    await dashboard.goToBooking();
    await plan.selectMRI();
    await schedule.schedule();
    await payment.pay();
    await confirmation.verify();
  });

  test('User fails Heart CT Scan pre-screening questionnaire', async () => {
    await dashboard.goToBooking();
    await plan.selectHeartCT();
    await plan.failHeartCTQuestionnaire();
    await plan.verifyFailedModal();
  });
});