import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, verifyEmailNotification } from 'redux/thunks/User';
import { useForm } from 'react-hook-form';

function EditUserEmail() {
  const { loggedUser, emailVerified } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userEmailErrorMsg, setUserEmailErrorMsg] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [verifiedEmailSent, setVerifiedEmailSent] = useState(false);
  const [verified, setVerified] = useState(loggedUser.confirmed);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register } = useForm();
  const [userEmail, setUserEmail] = useState('');
  const { t } = useTranslation('profile');
  const onEmailChangeHandler = (event) => {
    if (event.target.value === loggedUser.email) {
      setUserEmailError(true);
      setUserEmailErrorMsg(t('ADD_OTHER_EMAIL'));
      setUserEmail(event.target.value);
    } else {
      setUserEmail(event.target.value);
      setUserEmailError(false);
      setUserEmailErrorMsg(t(''));
    }
  };
  useEffect(() => {
    if (loggedUser.confirmed === 1) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, [verified]);

  const handleOtherEmail = () => {
    setUserEmail('');
    setVerifiedEmailSent(false);
  };

  const handleOnSubmit = () => {
    const localUser = { ...loggedUser };
    localUser.email = userEmail;
    localUser.verified = 0;
    dispatch(verifyEmailNotification());
    dispatch(updateUserProfile(localUser));
    setVerifiedEmailSent(true);
  };
  return (
    <div className="flex flex-row p-2">
      <Typography color="text.primary" variant="h5" gutterBottom>
        {`${t('USER_EMAIL')}: ${loggedUser.email}`}
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
            {verifiedEmailSent ? (
              <div className="flex justify-center flex-col">
                <Typography color="text.primary" variant="h5" gutterBottom>
                  {`${t('CONFIRM_EMAIL')}`}
                </Typography>
                <div className="flex justify-center">
                  <Button onClick={handleOtherEmail}>{t('OTHER_EMAIL')}</Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <h2>{t('NEW_EMAIL')}</h2>
                </div>
                <div className="flex justify-center">
                  <TextField
                    {...register('email')}
                    type="email"
                    required
                    autoComplete="on"
                    label={t('USER_EMAIL')}
                    value={userEmail}
                    onChange={onEmailChangeHandler}
                    className="w-3/4"
                    error={userEmailError}
                    helperText={userEmailErrorMsg}
                  />
                </div>
              </div>
            )}
            {!verifiedEmailSent && (
              <Button disabled={userEmailError} onClick={handleOnSubmit}>
                {t('SAVE')}
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default EditUserEmail;
