import React from 'react'
import errorImg from '../assets/images/404.svg'
import { IconButton } from 'rsuite'
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError()
  const text = error.statusText.split(",")
  // console.log(text);
  return (
    <>
      <div className="error-page">
        <div className="item">
          <img src={errorImg} />
          <div className="text">
            <h1 className="error-page-code">{404}</h1>
            <p className="error-page-title">{text[0] ? text[0] : "Oops… Kamu hanya menemukan halaman kosong"}</p>
            <p className="error-page-subtitle text-muted ">
              {text[1] ? text[1] : "Maaf halaman yang anda cari tidak kami temukan"}
            </p>
            <IconButton icon={<ArrowLeftLine />} appearance="primary" href="/">
              Kembali ke dashboard
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