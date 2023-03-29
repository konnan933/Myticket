import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { userResetPassword } from 'redux/thunks/User';

function ForgotPasswordContent() {
  const { t } = useTranslation('forgot');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  function handleEmailSumbit() {
    dispatch(userResetPassword({ email: email }));
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-4/5">
        <Typography className="p-5" variant="h5" align="center">
          {t('RESET_PASSWORD')}
        </Typography>
        <div className="grid gap-8">
          <TextField
            required
            autoComplete="on"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
          <Button
            variant="contained"
            color="info"
            className=" w-full mt-16"
            aria-label="Forgot pass"
            size="large"
            onClick={handleEmailSumbit}>
            {t('FORGOT_PASSWORD_EMAIL')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordContent;
