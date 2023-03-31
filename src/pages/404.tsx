import { ErrorLayout } from '@/layouts';

function NotFoundErrorPage() {
  return <h1>This link does nothing here</h1>;
}

NotFoundErrorPage.getLayout = (page: any) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - 404',
  },
});

export default NotFoundErrorPage;
