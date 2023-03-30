const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const valid = (name: string, email: string, password: string) => {
  if (!name || !email || !password) return 'Please add all fields.';

  if (!validateEmail(email)) return 'Invalid emails.';

  if (password.length < 6) return 'Password must be at least 6 characters.';

  return '';
};

export default valid;
