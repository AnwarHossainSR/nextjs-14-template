'use client';

import Link from 'next/link';
import styled from 'styled-components';

import type { ChildrenProps } from '@/types';

const Wrapper = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1rem;

  a {
    color: var(--text-color);
  }
`;

export function ErrorLayout({ children }: ChildrenProps) {
  return (
    <Wrapper>
      {children}
      <Link href="/" passHref>
        Go back to home
      </Link>
    </Wrapper>
  );
}
