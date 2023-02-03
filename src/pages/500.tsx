'use client';

import { ErrorLayout } from '@/layouts';
import type { NextPageWithLayout } from '@/types';

const ServerErrorPage: NextPageWithLayout = () => {
  return <h1>Something broke on the server on this page</h1>;
};

ServerErrorPage.getLayout = (page) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - 500',
  },
});

export default ServerErrorPage;
