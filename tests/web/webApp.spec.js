import { test, expect } from '@playwright/test';

test('Web app basic test', async ({ page }) => {

  console.log('🚀 Launching browser and navigating to site...');

  await page.goto('https://www.google.com');
  await page.waitForLoadState('domcontentloaded');

  // Title validation
  const title = await page.title();
  console.log('📄 Page Title:', title);
  await expect(page).toHaveTitle(/Example Domain/);

  // Heading validation
  const heading = await page.locator('h1').textContent();
  console.log('🧾 Heading Text:', heading);
  await expect(page.locator('h1')).toHaveText('Example Domain');

  // ✅ FIXED paragraph validation
  const paragraph = page.getByText('This domain is for use in documentation examples');
  await expect(paragraph).toBeVisible();

  console.log('✅ Web Test completed successfully');
});