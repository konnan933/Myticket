import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../underline.css';

function LoginButton() {
  const { t } = useTranslation('rootes');

  return (
    <Link to={'/login'}>
      <Typography className="text-white link-underline link-underline-black">
        {t('LOGIN')}
      </Typography>
    </Link>
  );
}
export default LoginButton;
