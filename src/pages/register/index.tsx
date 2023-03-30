import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Head } from '@/components';
import MainFooter from '@/components/Footer';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';

interface IError {
  name?: string;
  email?: string;
  password?: string;
  common?: string;
}

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState<IError>({
    name: '',
    email: '',
    password: '',
    common: '',
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (!name) return setError({ name: 'Name is required' });
    if (!email) return setError({ email: 'Email is required' });
    if (!password) return setError({ password: 'Password is required' });

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.status === 200) {
      router.push('/login');
    }

    return setError({ common: res.statusText });
  };

  return (
    <Wrapper>
      <Head title="Login" description="Login page" />
      <Header>
        <Link href="/login">
          <span>Login</span>
        </Link>
      </Header>
      <Content>
        <div className="flex flex-col items-center justify-center h-full">
          <form className="flex flex-col w-96" onSubmit={handleRegister}>
            {error?.common && (
              <div className="text-red-500 text-sm mt-2">{error?.common}</div>
            )}
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {error?.name && (
              <div className="text-red-500 text-sm mt-2">{error?.name}</div>
            )}
            <label htmlFor="email" className="text-sm font-semibold mt-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {error?.email && (
              <div className="text-red-500 text-sm mt-2">{error?.email}</div>
            )}
            <label htmlFor="password" className="text-sm font-semibold mt-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {error?.password && (
              <div className="text-red-500 text-sm mt-2">{error?.password}</div>
            )}
            <button
              type="submit"
              className="bg-gray-900 text-white rounded-md p-2 mt-4"
            >
              Register
            </button>
          </form>

          <div className="mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </Content>
      <MainFooter />
    </Wrapper>
  );
};

export default Register;
