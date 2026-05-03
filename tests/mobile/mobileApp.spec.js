import { test, expect } from '@playwright/test';
import { checkAccessibility } from '../../core/accessibility.js';

test('Mobile app basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toHaveText('Example Domain');
  await checkAccessibility(page);
});