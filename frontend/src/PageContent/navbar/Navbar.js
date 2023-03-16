import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { navbarConfig } from 'pages/routes/RootConfig';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangChanger from './components/LangChanger';
import { useSelector } from 'react-redux';
import AdminMenuList from './components/AdminMenuList';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import Loader from 'PageContent/utils/Loader';
import RegisterButton from './components/RegisterButton';
import BasketButton from './components/BasketButton';
import './underline.css';

export default function Navbar() {
  const matches = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('rootes');

  const { login, loggedIn } = useSelector((state) => state.auth);

  const [drawer, setDrawer] = useState(false);

  if (login[0].level === undefined) {
    return <Loader />;
  }
  return (
    <>
      <Box className="w-full">
        <AppBar position="static" sx={{ backgroundColor: '#262626', marginBottom: 2, height: 50 }}>
          {matches && (
            <div className="h-full flex justify-end items-center">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    setDrawer(true);
                  }}>
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </div>
          )}
          <div className="h-full flex flex-row justify-between items-center">
            <div className="w-1/6 flex justify-evenly items-center">
              {!matches && (
                <Link to={'/'}>
                  <Typography className="text-white link-underline link-underline-black">
                    {t('HOME')}
                  </Typography>
                </Link>
              )}
            </div>
            {loggedIn && (
              <div className="w-4/6 flex flex-row justify-evenly items-center">
                {!matches &&
                  navbarConfig.map((root, index) => {
                    if (root.pageName === 'ADMIN' && root.level.includes(login[0].level)) {
                      return <AdminMenuList key={index} />;
                    }
                    if (root.level.includes(login[0].level))
                      return (
                        <Link to={root.pagePath} key={index}>
                          <Typography className="text-white link-underline link-underline-black">
                            {t(root.pageName)}
                          </Typography>
                        </Link>
                      );
                  })}
              </div>
            )}
            {!loggedIn && (
              <div className="w-4/6 flex justify-evenly items-center">
                {!matches && <LoginButton />}
                {!matches && <RegisterButton />}
              </div>
            )}
            <div className="w-1/6 flex justify-evenly items-center">
              {loggedIn && !matches && <BasketButton />}
              {!matches && <LangChanger />}
              {loggedIn && !matches && <LogoutButton />}
            </div>
          </div>
        </AppBar>
      </Box>
      <Sidebar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
}
