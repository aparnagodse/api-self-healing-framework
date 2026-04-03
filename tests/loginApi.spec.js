import { test, expect } from '@playwright/test';
import { callApi } from '../core/apiClient.js';

test('Login API basic test', async () => {
  const res = await callApi('login_api');
  expect(res.id).toBeTruthy();
});