import { test, expect } from '@playwright/test';
import { callApi } from '../core/apiClient.js';

test('Login API basic test', async () => {
  const res = await callApi();
  expect(res.id).toBeTruthy();
});

// ✅ Clean shutdown to avoid async handle issues
test.afterAll(async () => {
  console.log("✅ Test completed cleanly");
});