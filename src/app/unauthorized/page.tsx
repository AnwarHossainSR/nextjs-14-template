import ErrorLayout from '@/layouts/ErrorLayout/ErrorLayout';

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

export default UnAuthorizeErrorPage;
