import Link from 'next/link';
import styled from 'styled-components';

import { theme } from '@/styles';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
`;

export const Content = styled.main`
  flex: 1;
`;

export const Footer = styled.footer`
  background-color: ${theme.colors.gray[900]};
  color: var(--color);
  padding: 2rem;
  display: flex;
  justify-content: flex-end;
`;

export const LinkButton = styled(Link)`
  display: inline-block;
  display: flex;
  gap: 0.5em;
  text-decoration: none;
  color: var(--text-color);
  padding: 0.5em 1em;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  will-change: background-color;

  &:hover {
    background-color: var(--background-active);
  }

  &:focus,
  &:active {
    outline: 1px solid ${theme.colors.gray[200]};
  }
`;
