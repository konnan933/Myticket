import { Drawer, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { navbarConfig } from 'pages/routes/RootConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import LangChanger from './components/LangChanger';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';
import LogoutButton from './components/LogoutButton';
import AdminMenuList from './components/AdminMenuList';
import BasketButton from './components/BasketButton';

function Sidebar({ drawer, setDrawer }) {
  const { t } = useTranslation('rootes');

  const { login, loggedIn } = useSelector((state) => state.auth);

  return (
    <Drawer
      anchor="right"
      open={Boolean(drawer)}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: { width: '50%', backgroundColor: '#262626' }
      }}>
      <Box className="h-screen">
        <div className="h-4/5 flex flex-col justify-start items-center gap-8">
          <IconButton
            size="large"
            aria-label="menu"
            sx={{ color: 'white' }}
            onClick={() => {
              setDrawer(false);
            }}>
            <CloseIcon />
          </IconButton>
          <div className="w-full flex justify-evenly items-center">
            <Link to={'/'}>
              <Typography className="text-white link-underline link-underline-black">
                {t('HOME')}
              </Typography>
            </Link>
          </div>
          {loggedIn && <BasketButton />}
          <LangChanger />
          {navbarConfig.map((root, index) => {
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
          {!loggedIn && <LoginButton />}
          {!loggedIn && <RegisterButton />}
        </div>
        <div className="h-1/5 flex flex-col justify-center items-center  ">
          {loggedIn && <LogoutButton />}
        </div>
      </Box>
    </Drawer>
  );
}
export default Sidebar;
