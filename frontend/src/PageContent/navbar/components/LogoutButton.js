import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLogout } from '../../../redux/thunks/Auth';

function LogoutButton() {
  const { t } = useTranslation('rootes');

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Link to="/">
      <Button onClick={handleLogout}>{t('LOGOUT')}</Button>;
    </Link>
  );
}
export default LogoutButton;
