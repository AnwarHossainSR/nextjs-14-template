import { useRouter } from 'next/router';

import { Head } from '@/components';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';

const Dashboard = () => {
  // const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // await logout();
    router.push('/');
  };
  return (
    <Wrapper>
      <Head title="Dashboard" description="Dashboard page" />
      <Header>
        <button type="button" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </Header>
      <Content>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;
