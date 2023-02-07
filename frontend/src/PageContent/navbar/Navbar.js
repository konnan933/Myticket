import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import {  useState } from 'react';
import rootConfig from 'pages/routes/RootConfig';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangChanger from './components/LangChanger';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const matches = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('rootes');
  
  const { login } =useSelector((state) => state.auth)

  const [drawer, setDrawer] = useState(false);

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
              rootConfig.map((root, index) => {
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
          </div>
        </AppBar>
      </Box>
      <Sidebar drawer={drawer} setDrawer={setDrawer} />
    </>
  );
}
