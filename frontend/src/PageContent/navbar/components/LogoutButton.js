import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { fetchLogout } from '../../../redux/thunks/Auth';
import { Tooltip } from '@mui/material';

function LogoutButton() {
  const { t } = useTranslation('rootes');

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Link to="/">
      <Tooltip title={t('LOGOUT')} placement="right-start">
        <ExitToAppIcon onClick={handleLogout} color="inherit" className="text-white" />
      </Tooltip>
    </Link>
  );
}
export default LogoutButton;
