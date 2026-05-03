import { test, expect } from '@playwright/test';

test('Mobile app basic test', async ({ page }) => {
  console.log('🚀 Launching mobile test...');

  await page.goto('https://www.google.com');
  await page.waitForLoadState('domcontentloaded');

  // Title validation
  const title = await page.title();
  console.log('📄 Page Title:', title);
  await expect(page).toHaveTitle(/Google/);

  // Stable element check (search box)
  const searchBox = page.locator('textarea[name="q"]');
  await expect(searchBox).toBeVisible();

  console.log('✅ Mobile test passed');
});