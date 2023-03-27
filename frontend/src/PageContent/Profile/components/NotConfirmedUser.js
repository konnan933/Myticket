import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailNotification } from 'redux/thunks/User';
import CloseIcon from '@mui/icons-material/Close';

function NotConfrimedUser() {
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    dispatch(verifyEmailNotification());
    setOpen(true);
  };
  console.log('git');
  const [open, setOpen] = useState(false);
  if (loggedUser.confirmed === 0) {
    return (
      <div className="flex justify-center">
        <div className="border-2 rounded border-red-500">
          <div className="m-4">{t('EMAIL_NOT_CONFIRMED')}</div>
          <div className="flex justify-center">
            <Button onClick={handleOpen}>{t('SEND_AGAIN')}</Button>
          </div>
        </div>
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
                <Typography color="text.primary" variant="h5">
                  {t('EMAIL_SENT')}
                </Typography>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default NotConfrimedUser;
