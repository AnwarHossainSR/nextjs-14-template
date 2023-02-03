import { ErrorLayout } from '@/layouts';
import type { NextPageWithLayout } from '@/types';

const NotFoundErrorPage: NextPageWithLayout = () => {
  return <h1>This link does nothing here</h1>;
};

NotFoundErrorPage.getLayout = (page) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - 404',
  },
});

export default NotFoundErrorPage;
