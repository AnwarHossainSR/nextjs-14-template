'use client';

import { ErrorLayout } from '@/layouts';

function ServerErrorPage() {
  return <h1>Something broke on the server on this page</h1>;
}

ServerErrorPage.getLayout = (page: any) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - 500',
  },
});

export default ServerErrorPage;
