import React from 'react';

import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mx-auto mb-[2re] min-h-[50vh] w-full max-w-[82rem] p-4 ">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
