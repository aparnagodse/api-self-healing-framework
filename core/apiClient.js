import { request } from '@playwright/test';
import apiStore from './apiStore.json' assert { type: 'json' };
import { getHealingSuggestion } from './aiHealer.js';
import 'dotenv/config';

async function callApi(key) {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const context = await request.newContext({
    baseURL
  });

  let config = apiStore[key];

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`🚀 Attempt ${attempt}`);
      console.log(`🌐 Calling: ${baseURL}${config.endpoint}`);

      const res = await context.get(config.endpoint);

      const text = await res.text();
      console.log("📄 Raw response:", text.substring(0, 200));

      let body;
      try {
        body = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response");
      }

      console.log("📦 Parsed:", body);

      // ✅ Success condition
      if (body.id) {
        console.log("✅ Success");
        return body;
      }

      throw new Error("Invalid response structure");

    } catch (err) {
      console.log("⚠️ Error:", err.message);

      console.log("🤖 Asking AI for fix...");

      const suggestion = await getHealingSuggestion(err.message, config);

      if (suggestion && suggestion.endpoint) {
        console.log("🧠 AI Suggestion:", suggestion);

        config.endpoint = suggestion.endpoint;

        console.log("🔄 Retrying with new endpoint:", config.endpoint);
      } else {
        console.log("⚠️ No valid AI fix, retrying...");
      }
    }
  }

  throw new Error("❌ API failed after healing");
}

export { callApi };