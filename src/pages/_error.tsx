import { ErrorLayout } from '@/layouts';

function ErrorPage() {
  return <h1>There was an error, let me check on that</h1>;
}

ErrorPage.getLayout = (page: any) => <ErrorLayout>{page}</ErrorLayout>;

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - error',
  },
});

export default ErrorPage;
