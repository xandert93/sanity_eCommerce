import React from 'react';
import Head from 'next/head';

import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Pro Shop</title>
        <meta name="description" content="Best Electronics Store in the World!" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
