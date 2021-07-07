import { hostname } from "./config";

const handleFetch = (method: string) => async (path: string, data?: any) => {
  const response = await fetch(`${hostname}${path}/`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: (method !== 'GET') ? JSON.stringify(data) : null
  });
  const body = await response.json();
  if (response.ok) {
    console.log(body);
    return body;
  }
  console.error(body);
}

export const get = handleFetch('GET');
export const post = handleFetch('POST');
export const put = handleFetch('PUT');
export const del = handleFetch('DELETE');