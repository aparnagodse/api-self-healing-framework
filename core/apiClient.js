catch (err) {
  console.log("⚠️ Error:", err.message);

  // 🚀 Skip AI in CI
  if (process.env.CI) {
    console.log("⚠️ Skipping AI healing in CI");
    throw err;
  }

  console.log("🤖 Asking AI for fix...");
  const suggestion = await getHealingSuggestion(err.message);

  console.log("🧠 Suggestion:", suggestion);

  // retry logic here
}