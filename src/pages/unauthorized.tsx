import { ErrorLayout } from '@/layouts';

function UnAuthorizeErrorPage() {
  return (
    <h1>
      You are not authorized to view this page. Please contact your
      administrator.
    </h1>
  );
}

UnAuthorizeErrorPage.getLayout = (page: any) => (
  <ErrorLayout>{page}</ErrorLayout>
);

export const getStaticProps = () => ({
  props: {
    title: '🕵🏼 - 404',
  },
});

export default UnAuthorizeErrorPage;
