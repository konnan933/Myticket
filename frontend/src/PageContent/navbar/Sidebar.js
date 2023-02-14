import { Button, Drawer } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { navbarConfig } from 'pages/routes/RootConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import LangChanger from './components/LangChanger';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';
import LogoutButton from './components/LogoutButton';

function Sidebar({ drawer, setDrawer }) {
  const { t } = useTranslation('rootes');

  const { login, loggedIn } = useSelector((state) => state.auth);

  return (
    <Drawer
      anchor="top"
      open={Boolean(drawer)}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: { width: '20%', backgroundColor: '#262626' }
      }}>
      <Box sx={{ width: '35%' }}>
        <div className="flex flex-col gap-4">
          <LangChanger />
          {navbarConfig.map((root, index) => {
            if (root.level.includes(login[0].level))
              return (
                <Link to={root.pagePath} key={index}>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
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
