import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { Head } from '@/components';
import MainFooter from '@/components/Footer';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';
import { commonHeaders } from '@/utils/client/headers';

interface IError {
  email?: string;
  password?: string;
  common?: string;
}

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState<IError>({
    email: '',
    password: '',
    common: '',
  });

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) return setError({ email: 'Email is required' });
    if (!password) return setError({ password: 'Password is required' });

    if (email && password) {
      const res = await fetch(
        '/api/auth/login',
        commonHeaders('POST', { email, password })
      );

      const response = await res.json();

      if (!res.ok) return setError({ common: response.message });
    }

    return router.push('/dashboard');
  };

  return (
    <Wrapper>
      <Head title="Login" description="Login page" />
      <Header>
        <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/login">
          <span>Login</span>
        </Link>
      </Header>
      <Content>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col w-96">
            {error?.common && (
              <div className="text-red-500 text-sm mb-2 text-center font-bold ">
                {error?.common}
              </div>
            )}
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="appearance-none bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              ref={emailRef}
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
              className="appearance-none bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              ref={passwordRef}
            />
            {error?.password && (
              <div className="text-red-500 text-sm mt-2">{error?.password}</div>
            )}
            <button
              type="submit"
              className="bg-gray-900 text-white rounded-md p-2 mt-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div className="mt-4">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </Content>
      <MainFooter />
    </Wrapper>
  );
};

export default Login;
