/* eslint-disable simple-import-sort/imports */

'use client';

import Link from 'next/link';
import type { FC } from 'react';

import type { CurrentUserProps } from '@/types';

const Header: FC<CurrentUserProps> = () => {
  return (
    <header className="px-8 py-8 flex justify-between bg-gray-900 text-violet-50">
      <Link href="/">
        <span>Home</span>
      </Link>
      <button
        className="bg-violet-50 text-gray-900 px-4 py-2 rounded-md"
        type="button"
      >
        Login
      </button>
    </header>
  );
};

export default Header;
