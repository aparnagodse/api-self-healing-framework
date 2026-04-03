async function getHealingSuggestion(error, config) {
  console.log("🤖 (Mock AI) Analyzing error...");

  // simulate AI delay
  await new Promise(res => setTimeout(res, 500));

  if (config.endpoint.includes('9999')) {
    return { endpoint: '/users/1' };
  }

  return null;
}

export { getHealingSuggestion };