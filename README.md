# 🤖 AI-Driven Self-Healing Playwright Testing Framework

An AI-driven Full Stack Test Automation Framework built using Playwright, covering API, Web UI, Accessibility, Performance, and Mobile testing with intelligent self-healing capabilities.

---

## 🚀 Key Features

- End-to-end automation using Playwright (API + UI)
- AI-assisted self-healing for flaky test recovery
- Reusable API client layer for scalable testing
- Page Object Model (POM) for maintainable UI tests
- Accessibility testing using axe-core
- Performance validation using Lighthouse
- Mobile testing structure for responsive scenarios
- CI/CD integration using GitHub Actions
- Allure reporting with AI insights

---

## 🧠 Framework Architecture

The diagram below illustrates the modular design of the framework, showcasing how API, UI, AI healing, accessibility, and performance layers integrate into a scalable testing solution.

<p align="center">
  <img src="screenshots/architecture.png" width="900"/>
</p>

---

## 📸 Demo Screenshots

### ✅ Playwright Test Report

This report shows the overall execution status of automated tests, including pass/fail results, execution time, and detailed step logs. It provides quick visibility into test health and regression outcomes.

![Playwright Report](screenshots/playwright-report.png)

---

### ⚡ Test Execution + Accessibility + Performance

This combined report demonstrates how functional testing is integrated with accessibility (WCAG checks) and performance (Lighthouse scores), giving a full quality view in a single execution.

![Execution Summary](screenshots/execution-summary.png)

---

## 📊 Allure Report

### Dashboard Overview

The Allure dashboard provides a visual summary of test execution, including trends, pass/fail distribution, and execution insights, making it easier for stakeholders to understand test outcomes.

![Allure Dashboard](screenshots/allure-dashboard.png)

---

### Failure Analysis

This view highlights failed tests with detailed debugging information such as error messages, screenshots, logs, and execution traces, helping quickly identify root causes.

![Allure Failure](screenshots/allure-failure.png)

---

## 🤖 AI Failure Analysis (Allure Integration)

The framework includes an AI-driven failure analysis layer that automatically detects test failures, categorises the likely root cause, and provides actionable recommendations directly inside the Allure report.

In the example below:

- The failure is identified as a **Locator Issue**
- The AI engine analyses the error message and classifies the root cause
- A suggested fix is generated to help resolve the issue quickly
- A confidence score indicates the reliability of the recommendation

This helps reduce debugging time, improves test stability, and supports faster root cause analysis — aligning with modern AI-assisted quality engineering practices.

![AI Failure Analysis](screenshots/allure-ai-analysis.png)

---

## 🧩 Framework Structure

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
```

---

## ▶️ Demo Video

👉 https://drive.google.com/file/d/1A1DT-3QVswHYtVJ5rDmKKXfzw5PaI7M5/view

---

## ⚙️ How to Run

```bash
npm install
npx playwright install
npx playwright test
```

---

## 📊 Reporting

```bash
npx playwright show-report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 💡 What Makes This Framework Different?

- AI-driven failure analysis with suggestions
- Self-healing automation approach
- Full-stack testing across API, UI, Accessibility and Performance layers
- Enterprise-level reporting using Playwright HTML reports and Allure
- Clear execution evidence through screenshots, logs and failure analysis

---

## 🎯 Purpose

This framework demonstrates how AI-assisted automation can:

- Improve test stability
- Reduce maintenance effort
- Enable full-stack quality validation
- Support modern QA, SDET, Test Lead and Quality Engineering roles

---

## 👩‍💻 Author

Aparna Godse  
Quality Engineering Consultant  
AI-driven Automation | Playwright | API | Accessibility | Performance
