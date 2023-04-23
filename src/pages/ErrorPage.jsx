import React from 'react'
import error from '../assets/images/404.svg'
import { IconButton } from 'rsuite'
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className="error-page">
        <div className="item">
          <img src={error} />
          <div className="text">
            <h1 className="error-page-code">404</h1>
            <p className="error-page-title">Oops… You just found an error page</p>
            <p className="error-page-subtitle text-muted ">
              We are sorry but the page you are looking for was not found
            </p>
            <IconButton icon={<ArrowLeftLine />} appearance="primary" href="/">
              Take me home
            </IconButton>
            {/* {children} */}
          </div>
        </div>
      </div>
    </>
  )
  // const error = useRouteError();
  // console.error(error);

  // return (
  //   <div id="error-page">
  //     <h1>Oops!</h1>
  //     <p>Sorry, an unexpected error has occurred.</p>
  //     <p>
  //       <i>{error.statusText || error.message}</i>
  //     </p>
  //   </div>
  // );
}

export default ErrorPage