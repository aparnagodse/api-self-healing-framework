import { test, expect } from '@playwright/test';
import { measureResponseTime } from '../../core/performance.js';
import { getUser } from '../../core/apiClient.js';

test('API response time', async () => {
  const time = await measureResponseTime(() => getUser(1));
  console.log(`API response time: ${time}ms`);
  expect(time).toBeLessThan(500);
});