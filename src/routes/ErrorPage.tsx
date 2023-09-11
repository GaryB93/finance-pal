import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  let errorMsg: string;
  
  if (isRouteErrorResponse(error)) {
    errorMsg = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  } else if (typeof error === 'string') {
    errorMsg = error;
  } else {
    console.error(error);
    errorMsg = 'Unknown error';
  }

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMsg}</i>
      </p>
    </div>
  )
};

export default ErrorPage;