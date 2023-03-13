import { Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function LoginContent() {
  const { t } = useTranslation('login');
  const { loginLoading, loggedIn } = useSelector((state) => state.auth);

  if (loginLoading) {
    return <Loader />;
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2 max-md:w-4/5 h-3/5 max-md:h-4/5 border-2 rounded-lg border-bc-yellow-theme flex flex-col gap-10 justify-center items-center">
        <div className="w-full flex max-md:flex-col max-md:gap-5 justify-evenly items-center">
          <img src="images/small_logo.png" width={150} height={150} />
          <Typography variant="h5" align="center">
            {t('WELCOME')}
          </Typography>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginContent;
