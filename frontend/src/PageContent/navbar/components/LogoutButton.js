import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchLogout } from '../../../redux/thunks/Auth';

function LogoutButton() {
  const { t } = useTranslation('rootes');

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
    return <Navigate to="/" />;
  };

  return <Button onClick={handleLogout}>{t('LOGOUT')}</Button>;
}
export default LogoutButton;
