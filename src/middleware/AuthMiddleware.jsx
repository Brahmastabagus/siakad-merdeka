import React from 'react'
import { Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

const AuthMiddleware = ({ component, auth }) => {
  // console.log(component);
  const acc = "admin"
  const Component = component

  if (acc === auth) {
    return <Component></Component>
  } else {
    throw new Response(
      "Tidak Ditemukan",
      {
        statusText:
          ["Halaman Tidak Ditemukan", "Maaf halaman yang anda cari tidak ditemukan"],
        status: 404
      }
    )
  }
}

export default AuthMiddleware