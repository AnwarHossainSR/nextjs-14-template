import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import getCurrentUser from '@/app/actions/getCurrentUser';
import { ClientOnly } from '@/components/ClientOnly/ClientOnly';
import MainFooter from '@/components/Footer';
import Header from '@/components/Header';
import LoginModal from '@/components/Modals/LoginModal';
import RegisterModal from '@/components/Modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import type { ChildrenProps } from '@/types';

export const metadata = {
  description:
    'A highly opinionated and complete starter for Next.js projects ready to production. Includes Typescript, Styled Components, Prettier, ESLint, Husky, SEO, and more.',
  keywords:
    'next, starter, typescript, tailwind css, prettier, eslint, husky, seo',
  title: 'Next Starter',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full flex flex-col justify-between`}
      >
        <ClientOnly>
          <Header currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <ToasterProvider />
        </ClientOnly>
        <section className="flex-1">{children}</section>
        <MainFooter />
      </body>
    </html>
  );
}
