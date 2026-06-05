# MRI Booking Playwright Automation Framework

## Overview
This project automates an end-to-end MRI booking flow using Playwright + TypeScript.

It follows a Page Object Model (POM) architecture to ensure:
- Maintainability
- Scalability

---

## Run Tests

- npm install
- npx playwright install
- npx playwrite test OR npx playwrite test --headed (if you want to see browser UI)

---

## Test Coverage

Automated scenario #1 "User can book MRI scan end-to-end":
1. Login
2. Navigate to "Book a scan"
3. Select MRI scan plan
4. Select Florida → Aventura facility
5. Choose date (27th) and 3 time slots
6. Enter payment details
7. Verify confirmation message

Automated scenario #2 "User fails Heart CT Scan pre-screening questionnaire":
1. Login
2. Navigate to "Book a scan"
3. Select Heart CT Scan scan plan
4. Answer "Yes" to the first question and "No" to the rest of the questions
5. Verify confirmation message

---

## Why these test cases were automated

This flow was chosen because it represents the **critical business path**:
- Revenue-generating workflow (booking + payment)
- High user impact (end-to-end success journey)
- Cross-system validation (UI + scheduling + payment + confirmation)
- Clinical safety validation by ensuring users with specific medical conditions are correctly blocked from booking a Heart CT based on questionnaire responses

---

## Future Improvements

- Add API functionality for test data creation and endpoint validations
- Add CI pipeline (GitHub Actions)
- Add reporting (Allure / HTML report)
- Add negative test coverage (invalid payment, missing slots, etc.)

---

## Test results

<img width="857" height="93" alt="Screenshot 2026-06-05 at 2 08 47 PM" src="https://github.com/user-attachments/assets/471912a1-e91c-4199-8724-c4c2f5a694c6" />
