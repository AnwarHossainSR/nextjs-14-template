import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { Head } from '@/components';
import MainFooter from '@/components/Footer';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';
import { commonHeaders } from '@/utils/client/headers';

interface IError {
  name?: string;
  email?: string;
  password?: string;
  common?: string;
}

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

    const res = await fetch(
      '/api/auth/register',
      commonHeaders('POST', {
        email,
        password,
        name,
      })
    );

    if (res.ok) {
      router.push('/login');
    }

    const response = await res.json();
    return setError({ common: response.err });
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
          <form className="flex flex-col w-96" onSubmit={handleRegister}>
            {error?.common && (
              <div className="text-red-500 text-center text-sm mt-2">
                {error?.common}
              </div>
            )}
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="appearance-none bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              ref={nameRef}
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
