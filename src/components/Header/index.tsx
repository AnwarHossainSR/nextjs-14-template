/* eslint-disable simple-import-sort/imports */

'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { FC } from 'react';

import { useLoginModal } from '@/hooks';
import type { CurrentUserProps } from '@/types';

const Header: FC<CurrentUserProps> = ({ currentUser }) => {
  const { data: session } = useSession();
  // const router = useRouter();
  const loginModal = useLoginModal();

  const logout = async () => {
    await signOut();
    redirect('/');
  };

  // eslint-disable-next-line no-console
  console.log(session, currentUser);

  return (
    <header className="px-8 py-8 flex justify-between bg-gray-900 text-violet-50">
      <Link href="/">
        <span>Home</span>
      </Link>
      {session?.user ? (
        <div className="flex gap-4">
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
          <button
            className="bg-red-500 text-gray-900 px-4 py-2 rounded-md"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-violet-50 text-gray-900 px-4 py-2 rounded-md"
          type="button"
          onClick={loginModal.onOpen}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
