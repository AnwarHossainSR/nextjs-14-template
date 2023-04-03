export const commonHeaders = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS',
  body?: any
) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };
};
