import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function RegisterButton() {
  const { t } = useTranslation('rootes');


  return (<Link to={'/register'}>
                      <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                        {t('REGISTER')}
                      </Button>
                    </Link>);
}
export default RegisterButton;