import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserEmail, updateUserProfile, verifyEmail } from 'redux/thunks/User';
import { useForm } from 'react-hook-form';

function EditUserEmail() {
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userEmailErrorMsg, setUserEmailErrorMsg] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [verifiedEmailSent, setVerifiedEmailSent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEmailSent = () => window.location.reload(true);
  const handleClose = () => {
    setOpen(false);
    setUserEmail('');
    setUserEmailError(false);
    setUserEmailErrorMsg('');
  };
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
  const localUser = { ...loggedUser };

  const handleOnSubmit = () => {
    dispatch(checkUserEmail({ email: userEmail })).then((response) => {
      if (response.payload.taken) {
        setUserEmailError(true);
        setUserEmailErrorMsg(t('EMAIL_TAKEN'));
      } else {
        localUser.email = userEmail;
        localUser.confirmed = 0;
        dispatch(verifyEmail(loggedUser.id));
        dispatch(updateUserProfile(localUser));
        setVerifiedEmailSent(true);
      }
    });
  };
  return (
    <div className="flex flex-row p-2">
      <Typography color="text.primary" variant="h5" gutterBottom>
        {`${t('USER_EMAIL')}: ${loggedUser.email}`}
      </Typography>
      {loggedUser.confirmed === 1 && (
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div className="flex justify-center flex-col">
            <div className="flex justify-end">
              {verifiedEmailSent ? (
                <IconButton color="error" onClick={handleEmailSent}>
                  <CloseIcon fontSize="medium" />
                </IconButton>
              ) : (
                <IconButton color="error" onClick={handleClose}>
                  <CloseIcon fontSize="medium" />
                </IconButton>
              )}
            </div>
            {verifiedEmailSent ? (
              <div className="flex justify-center flex-col">
                <Typography color="text.primary" variant="h5" gutterBottom>
                  {`${t('CONFIRM_EMAIL')}`}
                </Typography>
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
