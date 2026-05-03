export async function suggestFix(error) {

  const message = error.message.toLowerCase();

  if (message.includes('timeout')) {
    return 'Increase timeout or check API response delay';
  }

  if (message.includes('404')) {
    return 'Check API endpoint URL';
  }

  if (message.includes('500')) {
    return 'Server issue - check backend logs';
  }

  if (message.includes('network')) {
    return 'Check internet or API base URL';
  }

  return 'Unknown issue - investigate logs and request payload';
}