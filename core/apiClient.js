import fetch from 'node-fetch';

async function callApi(apiName) {
  const url = "https://jsonplaceholder.typicode.com/users/1";

  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`🚀 Attempt ${attempt}`);
    console.log("🌐 Calling:", url);

    try {
      const res = await fetch(url);

      const text = await res.text();
      console.log("📄 Raw response:", text.slice(0, 200));

      let body;
      try {
        body = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid JSON response");
      }

      console.log("📦 Parsed:", body);

      // ✅ Success condition
      if (body && body.id) {
        console.log("✅ Success");
        return body;
      }

      throw new Error("Invalid response structure");

    } catch (err) {
      console.log("⚠️ Error:", err.message);

      // 🚀 Skip AI in CI
      if (process.env.CI) {
        console.log("⚠️ Skipping AI healing in CI");
        throw err;
      }

      console.log("🔁 Retrying...");
    }
  }

  throw new Error("❌ API failed after retries");
}

export { callApi };