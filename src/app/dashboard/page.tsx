/* eslint-disable no-alert */
import Link from 'next/link';
import { useRouter } from 'next/router';

import Header from '@/components/Header';
import MainLayout from '@/layouts/MainLayout/MainLayout';

const Dashboard = () => {
  // const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await res.json();

    if (response.success === true) {
      return router.push('/');
    }
    return alert(response.message);
  };

  const getAuthUserData = async () => {
    const res = await fetch('/api/auth/whoami', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  };

  const response = getAuthUserData();
  // eslint-disable-next-line no-console
  console.log(response);

  return (
    <MainLayout>
      <Header>
        <Link href="/">
          <span>Home</span>
        </Link>
        <button type="button" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </Header>
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
