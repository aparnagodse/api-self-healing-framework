/*import { test, expect } from '@playwright/test';
import { getUser } from '../../core/apiClient.js';
import { suggestFix } from '../../core/aihealer.js';

test('E2E Test - API + UI Validation', async ({ page }) => {

  console.log('🚀 Starting E2E Test...');

  try {
    // 🔹 Step 1: API call
    const user = await getUser(1);
    console.log('📦 API User:', user.name);

    // 🔹 Step 2: Open UI
    await page.goto('https://www.saucedemo.com/');

    // 🔹 Step 3: Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // 🔹 Step 4: Validate UI loaded
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 🔹 Step 5: Use API data in UI validation
    const title = await page.title();
    console.log('📄 Page title:', title);

    expect(title).toContain('Swag');

    console.log('✅ E2E Test Passed');

  } catch (error) {

    console.log('❌ E2E Test Failed:', error.message);

    const fix = await suggestFix(error);
    console.log('🤖 AI Suggestion:', fix);

    throw error;
  }
});*/