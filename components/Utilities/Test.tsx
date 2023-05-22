
import React from 'react';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="login-box">
        <h2 className="text-white text-2xl mb-6">Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required className="text-white" />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required className="text-white" />
            <label>Password</label>
          </div>
          <a href="#" className="text-white">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
