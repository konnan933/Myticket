import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { userResetPassword } from 'redux/thunks/User';

function ResetPassword() {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordChange = () => {
    const passwordData = {
      email: loggedUser.email,
      token: Cookies.get('XSRF-TOKEN')
    };
    console.log(passwordData);
    dispatch(userResetPassword(passwordData));
  };

  return (
    <div>
      <Button onClick={handleOpen} size="small">
        {t('RESET_PASSWORD')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div className="flex justify-center flex-col">
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <h2>{t('NEW_EMAIL')}</h2>
            </div>
            <div className="flex justify-center">
              <Button onClick={handlePasswordChange}>{t('SAVE')}</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default ResetPassword;
