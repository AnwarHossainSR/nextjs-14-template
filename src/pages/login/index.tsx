import Link from 'next/link';
import { useRouter } from 'next/router';

import { Head } from '@/components';
import MainFooter from '@/components/Footer';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';

const Login = () => {
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
      // await login(email, password);
    }

    router.push('/dashboard');
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
          <form className="flex flex-col w-96" onSubmit={handleLogin}>
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            <label htmlFor="password" className="text-sm font-semibold mt-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white rounded-md p-2 mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </Content>
      <MainFooter />
    </Wrapper>
  );
};

export default Login;
