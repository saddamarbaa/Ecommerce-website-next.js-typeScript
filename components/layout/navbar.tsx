/** @format */

import Link from 'next/link';
import React from 'react';

const Navbar: React.FunctionComponent = () => {
  return (
    <header className="bg-[#00695c] sticky top-0 z-50 overflow-hidden">
      <nav className=" text-white flex h-[4.5rem] mb-5 justify-between items-center text-[15px] max-w-[1200px] mx-auto">
        <div className="  flex  justify-between items-center space-x-8">
          <Link href="/">
            <a className="customlink">Shop</a>
          </Link>

          <Link href="/">
            <a className="customlink">Products</a>
          </Link>

          <Link href="/cart">
            <a className="customlink">Cart</a>
          </Link>

          <Link href="/add-product">
            <a className="customlink">Add Product</a>
          </Link>

          <Link href="/order">
            <a className="customlink">Oder</a>
          </Link>

          <Link href="/admin/products">
            <a className="customlink">Admin Products</a>
          </Link>

          <Link href="/admin/users">
            <a className="customlink"> Admin Users</a>
          </Link>
        </div>

        <div className=" flex  justify-between items-center space-x-8">
          <Link href="/login">
            <a className="customlink">Login</a>
          </Link>

          <Link href="/signup">
            <a className="customlink">SignUp</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
