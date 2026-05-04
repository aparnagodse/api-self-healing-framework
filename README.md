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
- Rich reporting for test execution insights

---
## 🧠 Framework Architecture

<p align="center">
  <img src="screenshots/architecture.png" width="900"/>
</p>

---

## 📸 Demo Screenshots

### ✅ Playwright Test Report

![Playwright Report](screenshots/playwright-report.png)

---

### ⚡ Test Execution + Accessibility + Performance

![Execution Summary](screenshots/execution-summary.png)
---

## 🧩 Framework Structure
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

---

## 🛠 Tech Stack

- Playwright  
- JavaScript / TypeScript  
- Node.js  
- GitHub Actions  
- axe-core (Accessibility)  
- Lighthouse (Performance)  
- Allure Reporting  

## ▶️ Demo Video

👉 [Watch Full Demo](https://drive.google.com/file/d/1A1DT-3QVswHYtVJ5rDmKKXfzw5PaI7M5/view?usp=sharing)

- Playwright test execution  
- AI self-healing capability  
- API + UI + Accessibility + Performance testing  
## ⚙️ How to Run

### Install dependencies
```bash
npm install

### Install Playwright browsers
npx playwright install

### Run all tests
npx playwright test

### Run API tests
npx playwright test tests/api
### Run Web tests
npx playwright test tests/web

---

## 📊 Reporting

```bash

npx playwright show-report 

## 📊 Allure Report

## 📊 Allure Report

### Dashboard Overview
![Allure Dashboard](screenshots/allure-dashboard.png)

---

### Failure Analysis
![Allure Failure](screenshots/allure-failure.png)
---

## 💡 What Makes This Framework Different?

- AI-assisted self-healing approach  
- Covers Functional + API + Accessibility + Performance testing  
- Designed for enterprise-scale automation  
- Modular and scalable architecture  
- Demonstrates full-stack quality engineering capability  

---

## 🎯 Purpose

This framework demonstrates how AI-assisted automation can:

- Improve test stability  
- Reduce maintenance effort  
- Enable full-stack quality validation  
- Support modern QA, SDET, and Test Lead roles  

---

## 👩‍💻 Author

Aparna Godse  
Quality Engineering Consultant  
AI-driven Automation | Playwright | API | Accessibility | Performance