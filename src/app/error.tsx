'use client';

import EmptyState from '@/components/EmptyState';

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorStateProps> = ({ error, reset }) => {
  return (
    <EmptyState
      title="Uh No!! There was a problem."
      subtitle={error.message || 'Something went wrong.'}
      showReset
      label="Try again"
      reset={reset}
    />
  );
};

export default Error;

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
