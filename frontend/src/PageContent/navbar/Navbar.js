import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { navbarConfig } from 'pages/routes/RootConfig';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangChanger from './components/LangChanger';
import { useSelector } from 'react-redux';
import AdminMenuList from './components/AdminMenuList';
import LogoutButton from './components/LogoutButton';
import Loader from 'PageContent/utils/Loader';

export default function Navbar() {
  const matches = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('rootes');

  const { login } = useSelector((state) => state.auth);

  const [drawer, setDrawer] = useState(false);

  if(login[0].level === undefined){
    return <Loader/>
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#262626' }}>
          {matches && (
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  setDrawer(true);
                }}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          )}
          <div className="flex flex-row justify-evenly">
            {!matches &&
              navbarConfig.map((root, index) => {
                if (root.pageName === 'ADMIN' && root.level.includes(login[0].level)) {
                  return <AdminMenuList key={index} />;
                }
                if (root.level.includes(login[0].level))
                  return (
                    <Link to={root.pagePath} key={index}>
                      <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                        {t(root.pageName)}
                      </Button>
                    </Link>
                  );
              })}
            <LangChanger />
            <LogoutButton />
          </div>
        </AppBar>
      </Box>
      <Sidebar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
}
