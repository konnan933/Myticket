import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { fetchLogout } from '../../../redux/thunks/Auth';
import { Tooltip, Typography, Modal, Box, Button } from '@mui/material';
import '../underline.css';
import { useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const { t } = useTranslation('rootes');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(fetchLogout());
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center">
      <Tooltip title={t('LOGOUT')} placement="right-start">
        <ExitToAppIcon onClick={handleClickOpen} color="inherit" className="text-white " />
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div className="flex justify-center pb-10 pt-5">
            <Typography>{t('CONFIRM_LOGOUT')}</Typography>
          </div>
          <div className="flex justify-evenly">
            <Button variant="outlined" onClick={handleClose}>
              {t('NO')}
            </Button>
            <Button variant="outlined" onClick={handleLogout} color="error" autoFocus>
              {t('YES')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default LogoutButton;
