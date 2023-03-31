import Link from 'next/link';

import MainFooter from '@/components/Footer';
import type { ChildrenProps } from '@/types';

import { Content, Header, Wrapper } from './styles';

export function MainLayout({ children }: ChildrenProps) {
  return (
    <Wrapper>
      <Header>
        <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/login">
          <span>Login</span>
        </Link>
      </Header>
      <Content>{children}</Content>
      <MainFooter />
    </Wrapper>
  );
}
