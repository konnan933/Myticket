import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailNotification } from 'redux/thunks/User';
import { useForm } from 'react-hook-form';

function EditUserEmail() {
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register } = useForm();
  const [userEmail, setUserEmail] = useState('');
  const { t } = useTranslation('profile');
  const onEmailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const handleOnSubmit = () => {
    dispatch(verifyEmailNotification());
  };
  return (
    <div className="flex flex-row">
      <Typography color="text.primary" variant="h5" gutterBottom>
        {`${'USER_EMAIL'} ${loggedUser.email}`}
      </Typography>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
              <TextField
                {...register('email')}
                type="email"
                label={t('USER_EMAIL')}
                value={userEmail}
                onChange={onEmailChangeHandler}
                className="w-3/4"
              />
            </div>
            <Button onClick={handleOnSubmit}>{t('SAVE')}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default EditUserEmail;
