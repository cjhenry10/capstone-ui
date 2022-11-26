import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link } from 'react-router-dom';
// import { indigo, } from '@mui/material/colors';

import AuthContext from '../../context/auth-context';
import Logo from '../Icons/Logo';
import Loading from './Loading';

const loginPage = 'Log In';
const loginPath = 'login';

const logoutPage = 'Log Out';
const logoutPath = 'logout';
// pages that show up in user menu/settings on avatar
const settings = ['Account'];
const settingsPaths = ['account'];

const Nav = ({onThemeChange, theme, mode: themeMode}) => {

  const mode = theme.palette.mode;

  const [fontColor, setFontColor] = React.useState('#fff');

  React.useEffect(() => {
    if (mode === 'dark') {
      setFontColor('#fff');
    } else {
      setFontColor('#000');
    }
  }, [mode, theme]);

  const { userData, isLoggedIn, isLoading, onLogout } =
    React.useContext(AuthContext);

    function stringAvatar(name) {
      return {
        sx: {
          bgcolor: themeMode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }

  const { name: username } = userData;

  let pages, paths;
  // pages and paths should line up
  // navbar pages

  if (!isLoggedIn) {
    pages = ['Sign Up'];
    paths = ['signup'];
  } else {
    pages = ['Tickets', 'Users', 'Roles', 'Groups','Create Ticket'];
    paths = ['tickets', 'users', 'role', 'group','ticket_creation'];
  }

  let progressBar = (
    <span
      style={{
        // backgroundColor: '#121212',
        // backgroundImage:
        //   'linear-gradient(rgba(255,255,255,0.09), rgba(255,255,255,0.09))',
        background: 'transparent',
        position: 'relative',
        height: '4px',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        display: 'block',
      }}
    ></span>
  );

  if (isLoading) {
    progressBar = <Loading />;
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    onLogout();
  };

  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Link style={{ textDecoration: 'none', color: 'white' }} to={(!isLoggedIn ? '/' : "/tickets")}>
              <Box
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Help Desk Wizard
                </Typography>
                <Logo color='white' width='1.5em' />
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>
                      <Link
                        style={{ textDecoration: 'none', color: fontColor }}
                        to={`/${paths[pages.indexOf(page)]}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant='h5'
              component='a'
              href=''
              sx={{
                mx: 'auto',
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Logo color='white' width='1.5em' />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={`/${paths[pages.indexOf(page)]}`}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                ml: 'auto',
                mr: 1,
                flexGrow: 0,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <p>{username}</p>
            </Box>
            <Box
      sx={{
        borderRadius: 1,
      }}
    >
      <IconButton sx={{ mr: 1 }} onClick={onThemeChange} color="inherit">
        {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>

            {!isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={loginPath}
                  >
                    {loginPage}
                  </Link>
                </Button>
              </Box>
            )}

            
            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {username && <Avatar {...stringAvatar(username)} />}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
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
                      <Link
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/${settingsPaths[settings.indexOf(setting)]}`}
                      >
                        <Typography textAlign='center'>{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to={logoutPath}
                    >
                      <Typography textAlign='center'>{logoutPage}</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
        {progressBar}
      </AppBar>
    </>
  );
};
export default Nav;
