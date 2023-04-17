'use client';

import { useEffect } from 'react';

import EmptyState from '@/components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;

// import ErrorLayout from '@/layouts/ErrorLayout/ErrorLayout';

// function ErrorPage() {
//   return <h1>There was an error, let me check on that</h1>;
// }

// ErrorPage.getLayout = (page: any) => <ErrorLayout>{page}</ErrorLayout>;

// export const getStaticProps = () => ({
//   props: {
//     title: '🕵🏼 - error',
//   },
// });

// export default ErrorPage;
