[![Playwright Tests](https://github.com/aparnagodse/api-self-healing-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/aparnagodse/api-self-healing-framework/actions/workflows/playwright.yml)

# API Self-Healing Framework

[![Playwright Tests](https://github.com/aparnagodse/api-self-healing-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/aparnagodse/api-self-healing-framework/actions/workflows/playwright.yml)

A modern **API testing framework** built with **Playwright** and **AI-assisted self-healing**, designed to automatically adapt to changes in API responses and ensure reliable test execution.

---

## 🚀 Overview

This project demonstrates:

- Automated API testing using **Playwright Test**.
- AI-powered self-healing for failed API tests.
- Retry mechanisms and error analysis for dynamic endpoints.
- CI/CD integration with **GitHub Actions** for automated test execution on push/PR.
- Clear test reporting and GitHub badges for test status visibility.

---

## 🛠 Features

- **Self-Healing API Tests:**  
  Detects failures in API response structure and requests AI guidance to fix tests dynamically.

- **Retry Logic:**  
  Automatically retries failed API calls with intelligent adjustments.

- **CI/CD Ready:**  
  Integrates with GitHub Actions to run tests on every commit or PR.

- **Clear Reporting:**  
  Generates logs and test reports in a structured format for easy debugging.

---

## 📂 Project Structure
api-self-healing-framework/
│
├─ core/ # API client and AI healer modules
├─ tests/ # Playwright API test files
├─ .github/workflows/ # CI/CD workflow YAML files
├─ package.json # Node.js project manifest
├─ playwright.config.ts # Playwright configuration
└─ README.md # This file


---

## ⚡ Prerequisites

- Node.js >= 20
- npm >= 9
- GitHub account (for CI/CD)
- API access credentials (for AI healer integration)

---

## 💻 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/aparnagodse/api-self-healing-framework.git
cd api-self-healing-framework

2. Install dependencies
npm install

3.Run tests locally
npx playwright test

4.Check test results in the test-results/ folder.

📈 CI/CD Integration
Uses GitHub Actions for automated test execution.
Workflow file: .github/workflows/playwright.yml
The CI badge above shows the latest test status on the main branch.
Automatically runs on push and pull_request events.

📖 Example Test Output
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}

✅ Test passed successfully with AI-assisted healing when required.

