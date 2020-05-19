import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, onLogIn }) => {

  if (isLoggedIn) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="jumbotron">
      <p>Log in to see secret page!</p>
      <button
        className="btn btn-primary"
        onClick={onLogIn} >
        Login
      </button>
    </div>
  );
}

export default LoginPage;