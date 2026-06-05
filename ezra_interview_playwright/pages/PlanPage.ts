import { expect, Page } from '@playwright/test';

export class PlanPage {
  constructor(private page: Page) {}

  mriTile = () => this.page.getByTestId('FB30-encounter-card');
  heartCtTile = () => this.page.getByTestId('CAC-encounter-card');
  continueButton = () => this.page.getByTestId('select-plan-submit-btn');
  questionnaireTitleText = () =>
    this.page.getByText('Please answer the following questions before we proceed:');
  yesChestSymptomsBtn = () => this.page.getByTestId('yes-chest-symptoms');
  noGatedCacStentBtn = () => this.page.getByTestId('no-gatedCacStent');
  noPacemakerBtn = () => this.page.getByTestId('no-pacemaker');
  noCoronaryHistoryBtn = () => this.page.getByTestId('no-coronaryHistory');
  noPreviousCacScoreThreeYearsBtn = () => this.page.getByTestId('no-previousCacScoreThreeYears');
  noPreviousCacScoreOver400Btn = () => this.page.getByTestId('no-previousCacScoreOver400');
  submitBtn = () => this.page.getByTestId('cac-prescreen-modal-submit-btn');

  failedModalTitleText = () =>
    this.page.getByText('We\'re sorry, this product isn\'t right for you.');
  failedModalTextOne = () =>
    this.page.getByText('It is strongly recommended to contact your personal healthcare provider to address this issue now and have the appropriate work up.');
  failedModalTextTwo = () =>
    this.page.getByText('This package is not suitable for you based on your medical history. Please go back and select a different scan package.');
  failedModalBackBtn = () => this.page.locator('button', { hasText: 'Back' });

  /*
    Select MRI Scan
  */
  async selectMRI() {
    await this.mriTile().click();
    await this.continueButton().click();
  }

  /*
    Select Heart CT Scan
  */
  async selectHeartCT() {
    await this.heartCtTile().click();
    await this.continueButton().click();
  }

  /*
    Verify that Heart CT Scan pre-screening questionnaire is displayed after selecting Heart CT Scan option
  */
  async verifyTitle() {
    await expect(this.questionnaireTitleText())
      .toContainText('Please answer the following questions before we proceed:');
  }

  /*
    Fail Heart CT Scan pre-screening questionnaire by selecting answers that indicate potential heart issues
  */
  async failHeartCTQuestionnaire() {
    await this.yesChestSymptomsBtn().click();
    await this.noGatedCacStentBtn().click();
    await this.noPacemakerBtn().click();
    await this.noCoronaryHistoryBtn().click();
    await this.noPreviousCacScoreThreeYearsBtn().click();
    await this.noPreviousCacScoreOver400Btn().click();
    await this.submitBtn().click();
  }

  /*
    Verify that appropriate error message is displayed after failing Heart CT Scan pre-screening questionnaire
  */
  async verifyFailedModal() {
    await expect(this.failedModalTitleText())
      .toContainText('We\'re sorry, this product isn\'t right for you.');
    await expect(this.failedModalTextOne())
      .toContainText('It is strongly recommended to contact your personal healthcare provider to address this issue now and have the appropriate work up.');
    await expect(this.failedModalTextTwo())
      .toContainText('This package is not suitable for you based on your medical history. Please go back and select a different scan package.');
    await expect(this.failedModalBackBtn())
      .toBeVisible();
    await this.failedModalBackBtn().click();
  }
}