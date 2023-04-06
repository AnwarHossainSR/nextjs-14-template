import Link from 'next/link';

import type { ChildrenProps } from '@/types';

export const metadata = {
  title: 'Something is wrong',
  description: 'Something is wrong',
};

export default function ErrorLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
          <Link href="/" passHref>
            Go back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
