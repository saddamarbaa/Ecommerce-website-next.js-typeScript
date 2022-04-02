import Link from 'next/link'
import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'

import MoreIcon from '@mui/icons-material/MoreVert'
import { connect } from 'react-redux'

import { removeAuthenticatedUser } from '../../../redux/actions/index'
import { ReducerType } from '../../../redux/reducers/rootReducer'
import { removedUserFromLocalStorage } from '../../../utils/functions/helpers'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

function Navbar(props: any) {
  const { isAuthenticated, isADmin } = props.auth
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const signedOutHandler = () => {
    props.removeAuthenticatedUser()
    removedUserFromLocalStorage()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="sticky" className="bg-[#00695c] sticky top-0 z-50 overflow-hidden">
      <Container maxWidth="lg" fixed className="text-white">
        <Toolbar
          disableGutters
          className=" text-white flex h-[4.5rem] mb-5 justify-between items-center text-[15px] max-w-[1200px] mx-auto"
        >
          <div className="flex  justify-between items-center space-x-8">
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
                <Link href="/add-product">
                  <a className="customlink">Add Product</a>
                </Link>
                <Link href="/admin/products">
                  <a className="customlink">Admin Products</a>
                </Link>
                <Link href="/admin/users-ui">
                  <a className="customlink"> Admin Users UI</a>
                </Link>
                {/* <Link href="/admin/users-table">
                  <a className="customlink"> Admin Users Table</a>
                </Link> */}
              </>
            )}
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </div>
          </div>
          {isAuthenticated && (
            <div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/images/avatar/tem3.png" />
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* <button className=" customlink" onClick={signedOutHandler}>
                SignOut
              </button> */}
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
        </Toolbar>
      </Container>
    </AppBar>
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
