import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { fetchLogout } from '../../../redux/thunks/Auth';
import { Tooltip, useMediaQuery, Typography } from '@mui/material';
import '../underline.css';

function LogoutButton() {
  const matches = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('rootes');

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Link to="/" className="flex max-md:w-full justify-evenly">
      {matches && (
        <Typography className="text-white link-underline link-underline-black">
          {t('LOGOUT')}
        </Typography>
      )}
      <Tooltip title={t('LOGOUT')} placement="right-start">
        <ExitToAppIcon onClick={handleLogout} color="inherit" className="text-white " />
      </Tooltip>
    </Link>
  );
}
export default LogoutButton;
