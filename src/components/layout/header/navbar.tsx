import React from 'react';
import { connect } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  handleProductSearchTerm,
  handleSelectedCategory,
  ReducerType,
  removeAuthenticatedUser,
} from 'global-states';
import getConfig from 'next/config';
import Link from 'next/link';
import {
  _authPrototypeReducerState as ReducerState,
  _productPrototypeReducerState as ReducerProductState,
} from 'types';
import { removedUserFromLocalStorage } from 'utils';

interface MapDispatchProps {
  removeAuthenticatedUser: () => void;
  handleProductSearchTerm: (payload: string) => void;
  handleSelectedCategory: (payload: string) => void;
}

interface MapStateProps {
  authState: ReducerState;
  listState: ReducerProductState;
}

type PropsType = MapDispatchProps & MapStateProps;

function Navbar({
  authState,
  listState,
  removeAuthenticatedUser,
  handleProductSearchTerm,
  handleSelectedCategory,
}: PropsType) {
  const { productSearchTerm } = listState;
  const { publicRuntimeConfig } = getConfig();
  const { isAuthenticated, isADmin, loginUser } = authState;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const signedOutHandler = () => {
    removeAuthenticatedUser();
    removedUserFromLocalStorage();
  };

  const settings = [
    {
      value: 'Profile',
    },
    { value: 'Logout', handleClick: signedOutHandler },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-[#00695c] ">
      <nav className="sm:pr-4-0 mx-auto flex max-w-[1200px] items-center justify-end pr-5 pt-6 pb-6 text-[15px] text-white sm:justify-between ">
        <div className="hidden grow items-center space-x-8 sm:flex">
          <Link href="/">
            <a className="customlink">JSM SHOPE</a>
          </Link>
          {isADmin !== 'admin' && (
            <div className="flex max-w-2xl grow items-center rounded-[6px]  border-2 border-[#cd9042]  bg-white text-gray-700 shadow-md  outline-none  transition duration-150 ease-in-out ">
              <div>
                <select
                  className="select select-bordered  border-0  py-3 "
                  onChange={(event) => handleSelectedCategory(event.target.value)}
                >
                  <option value="All Products">All Products</option>
                  <option value="Sports">Sports</option>
                  <option value="Football">Football</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Personal Computers">Computers</option>
                  <option value="Women's clothing">Women&apos;s clothing</option>
                  <option value="Women's Shoes">Women&apos;s Shoes</option>
                  <option value="Jewelery">Jewelery</option>
                  <option value="Men's clothing">Men&apos;s clothing</option>
                  <option value="Men's Shoes">Men&apos;s Shoes</option>
                  <option value="Toys">Toys</option>
                </select>
              </div>
              <input
                type="search"
                className="block w-full min-w-[100px] px-3 focus:border-0 focus:outline-none"
                aria-label="Search products"
                aria-describedby="button-addon2"
                value={productSearchTerm}
                onChange={(e) => handleProductSearchTerm(e.target.value)}
              />
              <div className=" bg-[#cd9042] py-3 px-4">
                <SearchIcon className="cursor-pointer  text-[1.3rem] text-white " />
              </div>
            </div>
          )}
          {isADmin === 'admin' && (
            <>
              <Link href="/admin/products/add-product">
                <a className="customlink">Add Product</a>
              </Link>
              <Link href="/admin/users/add-user">
                <a className="customlink">Add User</a>
              </Link>
              <Link href="/admin/products">
                <a className="customlink">Products</a>
              </Link>
              <Link href="/admin/users/users-ui">
                <a className="customlink">Users</a>
              </Link>
              <Link href="/admin/users/users-table">
                <a className="customlink">Users Table</a>
              </Link>
            </>
          )}
        </div>
        <div className="hidden items-center space-x-12 sm:flex">
          {isAuthenticated && (
            <>
              <Link href="/order">
                <a className="customlink">Contact Us </a>
              </Link>
              <Link href="/order">
                <a className="customlink">Your order</a>
              </Link>
              <Link href="/cart">
                <div className="cursor-pointer">
                  <ShoppingCartIcon className="relative cursor-pointer text-[2.2rem]" />
                  <div className="absolute top-[0px] flex h-7 w-7 items-center justify-center rounded-full bg-[#f08804] text-[12px] font-bold text-black">
                    2
                  </div>
                </div>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Image"
                      className="h-[50px] w-[50px] rounded-full"
                      src={
                        loginUser
                          ? `${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${loginUser?.profileImage}`
                          : '/avatar/tem3.png'
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.value}>
                      <Typography
                        textAlign="center"
                        onClick={setting.handleClick || handleCloseUserMenu}
                      >
                        {setting.value}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          )}

          {!isAuthenticated && (
            <>
              <Link href="/login">
                <a className="customlink cursor-pointer">Login</a>
              </Link>
              <Link href="/signup">
                <a className="customlink">SignUp</a>
              </Link>
            </>
          )}
        </div>
        <div className="cursor-pointer sm:hidden ">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
  listState: state.products,
});

const mapDispatchToProps = {
  removeAuthenticatedUser,
  handleProductSearchTerm,
  handleSelectedCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
