import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function LoginButton() {
  const { t } = useTranslation('rootes');


  return (<Link to={'/login'}>
                      <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                        {t('LOGIN')}
                      </Button>
                    </Link>);
}
export default LoginButton;