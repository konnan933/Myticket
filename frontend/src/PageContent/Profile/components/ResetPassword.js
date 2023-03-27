import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { userResetPassword } from 'redux/thunks/User';

function ResetPassword() {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  console.log(loggedUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(userResetPassword({ email: loggedUser.email }));
  };
  const handleClose = () => setOpen(false);

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
            <Typography variant="h5" align="center">
              {t('RESET_PASSWORD_EMAIL')}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default ResetPassword;
