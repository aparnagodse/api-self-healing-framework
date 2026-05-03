# AI-Driven Self-Healing Playwright Testing Framework

A modern Playwright-based test automation framework designed for API, Web UI, Accessibility, Performance and Mobile testing, with AI-assisted self-healing capabilities.

## Key Features

- Playwright automation for web and API testing
- AI-assisted self-healing logic for unstable test failures
- API testing with reusable client layer
- Page Object Model structure for UI automation
- Accessibility testing using axe-core
- Lighthouse performance validation
- Mobile test structure for responsive scenarios
- GitHub Actions CI/CD workflow
- Clean reporting support for test evidence

## Framework Structure

```text
core/
  apiClient.js
  aiHealer.js
  accessibility.js
  lighthouse.js
  performance.js

pages/
  BasePage.js
  LoginPage.js
  HomePage.js
  ProductPage.js
  CartPage.js
  CheckoutPage.js

tests/
  api/
  web/
  e2e/
  mobile/
  performance/

fixtures/
utils/
Tech Stack


Playwright


JavaScript / TypeScript


Node.js


GitHub Actions


axe-core


Lighthouse


Allure Reporting


How to Run
Install dependencies:
npm install
Install Playwright browsers:
npx playwright install
Run all tests:
npx playwright test
Run API tests:
npx playwright test tests/api
Run web tests:
npx playwright test tests/web
Reporting
Generate and view Playwright report:
npx playwright show-report
Purpose of This Framework
This framework demonstrates how AI-assisted automation can improve test stability, reduce maintenance effort and support end-to-end quality engineering across multiple testing layers.
It is designed as a portfolio-ready framework for modern QA, SDET and Test Automation roles.
Author
Aparna Godse
Quality Engineering Consultant | AI-driven Automation | Playwright | API Testing | Accessibility | Performance Testing