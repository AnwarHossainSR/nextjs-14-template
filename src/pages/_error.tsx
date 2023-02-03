import { ErrorLayout } from '@/layouts';
import type { NextPageWithLayout } from '@/types';

const ErrorPage: NextPageWithLayout = () => {
  return <h1>There was an error, let me check on that</h1>;
};

ErrorPage.getLayout = (page) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - error',
  },
});

export default ErrorPage;
