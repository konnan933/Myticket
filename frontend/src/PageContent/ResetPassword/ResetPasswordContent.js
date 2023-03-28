import { Button, TextField, Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import regexTests from 'PageContent/utils/Regex';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resettedPassword } from 'redux/thunks/User';

function ResetPasswordContent() {
  const { t } = useTranslation('password');
  const { rndCodePassword } = useParams();
  const dispatch = useDispatch();
  const { resettedPasswordLoading } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();

  const registerObj = {
    password: '',
    password_confirmation: ''
  };

  const [registerData, setRegisterData] = useState(registerObj);
  const [passwordErr, setPasswordErr] = useState(false);

  const registerChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'password') {
      setPasswordErr(!regexTests.password.test(value));
    }
    setRegisterData({ ...registerData, [name]: value });
  };

  if (resettedPasswordLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-4/5">
      <Typography className="p-5" variant="h5" align="center">
        {t('RESET_PASSWORD')}
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(resettedPassword({ rndString: rndCodePassword, formData: data }));
        })}
        className="flex justify-center w-full">
        <fieldset className="w-1/3 max-md:w-3/4">
          <div className="grid gap-8">
            <TextField
              {...register('password')}
              required
              name="password"
              type="password"
              value={registerData.password}
              error={passwordErr}
              helperText={passwordErr && t('PASSWORD_STRENGHT')}
              onChange={registerChangeHandler}
              label={t('PASSWORD')}
              className="border-2"
            />
            <TextField
              {...register('password_confirmation')}
              required
              name="password_confirmation"
              type="password"
              error={registerData.password !== registerData.password_confirmation}
              helperText={
                registerData.password !== registerData.password_confirmation &&
                t('PASSWORD_MISSMATCH')
              }
              value={registerData.password_confirmation}
              onChange={registerChangeHandler}
              label={t('PASSWORD_CONFIRM')}
              className="border-2"
            />

            <Button
              variant="contained"
              color="info"
              disabled={passwordErr || registerData.password !== registerData.password_confirmation}
              className=" w-full mt-16"
              aria-label="Sign in"
              type="submit"
              size="large">
              {t('RESET_PASSWORD')}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ResetPasswordContent;
