export const isAuthenticated = async () => {
  const token = 'dsf';
  console.log(token);

  const authUser = await fetch('/api/auth/whoami', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(token ?? '').accessToken}`,
    },
  });

  const response = await authUser.json();

  if (response.success) return response.user;

  return null;
};
