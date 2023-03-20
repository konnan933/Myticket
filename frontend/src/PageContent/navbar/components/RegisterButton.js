import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../underline.css';

function RegisterButton() {
  const { t } = useTranslation('rootes');

  return (
    <Link to={'/register'}>
      <Typography className="text-white link-underline link-underline-black ">
        {t('REGISTER')}
      </Typography>
    </Link>
  );
}
export default RegisterButton;
