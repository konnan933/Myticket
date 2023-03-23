import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

function ResetPassword() {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onPasswordConfirmChangeHandler = (event) => {
    setPasswordConfirm(event.target.value);
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
              <form
                onSubmit={handleSubmit(() => {
                  const passwordData = {
                    email: loggedUser.email,
                    password: password,
                    confirm: passwordConfirm,
                    token: Cookies.get('XSRF-TOKEN')
                  };
                  console.log(passwordData);
                  dispatch(ResetPassword(passwordData));
                })}>
                <TextField
                  {...register('password')}
                  type="password"
                  label={t('PASSWORD')}
                  value={password}
                  onChange={onPasswordChangeHandler}
                  className="w-3/4"
                />
                <TextField
                  {...register('confirmed')}
                  type="password"
                  label={t('CONFIRM_PASSWORD')}
                  value={passwordConfirm}
                  onChange={onPasswordConfirmChangeHandler}
                  className="w-3/4"
                />
                <Button type="submit">{t('SAVE')}</Button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default ResetPassword;
