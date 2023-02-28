import { Button, Drawer, IconButton } from '@mui/material';
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

function Sidebar({ drawer, setDrawer }) {
  const { t } = useTranslation('rootes');

  const { login, loggedIn } = useSelector((state) => state.auth);

  return (
    <Drawer
      anchor="right"
      open={Boolean(drawer)}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: { width: '40%', backgroundColor: '#262626' }
      }}>
      <Box>
        <div className="flex flex-col gap-4">
          <IconButton
            size="large"
            aria-label="menu"
            sx={{ color: 'white' }}
            onClick={() => {
              setDrawer(false);
            }}>
            <CloseIcon />
          </IconButton>
          <LangChanger />
          {navbarConfig.map((root, index) => {
            if (root.pageName === 'ADMIN' && root.level.includes(login[0].level)) {
              return <AdminMenuList key={index} />;
            }
            if (root.level.includes(login[0].level))
              return (
                <Link to={root.pagePath} key={index}>
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white', width: '100%' }}>
                    {t(root.pageName)}
                  </Button>
                </Link>
              );
          })}
          {!loggedIn && <LoginButton />}
          {!loggedIn && <RegisterButton />}
          {loggedIn && <LogoutButton />}
        </div>
      </Box>
    </Drawer>
  );
}
export default Sidebar;
