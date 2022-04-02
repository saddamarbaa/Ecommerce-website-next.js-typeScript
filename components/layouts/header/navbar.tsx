import Link from 'next/link'
import React from 'react'

import { connect } from 'react-redux'
import { ReducerType, removeAuthenticatedUser } from 'global-states'
import { removedUserFromLocalStorage } from 'utils'

function Navbar(props: any) {
  const { isAuthenticated, isADmin } = props.auth

  const signedOutHandler = () => {
    props.removeAuthenticatedUser()
    removedUserFromLocalStorage()
  }

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
          <Link href="/order">
            <a className="customlink">Oder</a>
          </Link>
          {isADmin === 'admin' && (
            <>
              <Link href="/admin/products/add-product">
                <a className="customlink">Add Product</a>
              </Link>
              <Link href="/admin/products">
                <a className="customlink">Admin Products</a>
              </Link>
              <Link href="/admin/users/users-ui">
                <a className="customlink"> Admin Users UI</a>
              </Link>
              <Link href="/admin/users/users-table">
                <a className="customlink"> Admin Users Table</a>
              </Link>
            </>
          )}
        </div>
        {isAuthenticated && (
        <div>
          <button className=" customlink" onClick={signedOutHandler}>
            SignOut
          </button>
        </div>
        )}
        {!isAuthenticated && (
        <div className=" flex  justify-between items-center space-x-8">
          <Link href="/login">
            <a className="customlink cursor-pointer">Login</a>
          </Link>

          <Link href="/signup">
            <a className="customlink">SignUp</a>
          </Link>
        </div>
        )}
      </nav>
    </header>
  )
}

const mapStateToProps = (state: ReducerType) => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  removeAuthenticatedUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar)
