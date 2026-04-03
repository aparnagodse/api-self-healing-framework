async function callApi() {
  const url = "https://jsonplaceholder.typicode.com/users/1";

  console.log("🌐 Calling:", url);

  const res = await fetch(url);
  const body = await res.json();

  console.log("📦 Response:", body);

  if (!body || !body.id) {
    throw new Error("Invalid response");
  }

  return body;
}

export { callApi };