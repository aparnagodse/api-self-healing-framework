import { test, expect } from '@playwright/test';
import { getUser } from '../../core/apiClient.js';   // ✅ FIXED PATH

test('Login API basic test', async () => {
  const user = await getUser(1);

  console.log('📦 Response:', user);

  // Assertions
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');

  console.log('✅ API Test completed successfully');
});