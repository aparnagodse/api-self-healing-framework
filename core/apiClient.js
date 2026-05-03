import fetch from 'node-fetch';

export async function getUser(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const data = await response.json();
  return data;
}