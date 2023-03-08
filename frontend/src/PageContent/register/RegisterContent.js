import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from 'redux/thunks/Auth';
import Loader from 'PageContent/utils/Loader';
import { Navigate } from 'react-router-dom';
import regexTests from 'PageContent/utils/Regex';

function RegisterContent() {
  const { t } = useTranslation('register');

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { regLoading, loggedIn } = useSelector((state) => state.auth);

  const registerObj = {
    email: 'af@gmail.com',
    password: 'Aa123456',
    password_confirmation: 'Aa123456',
    userName: 'Jancsi',
    phoneNumber: '06301111111'
  };

  const [registerData, setRegisterData] = useState(registerObj);
  const [passwordErr, setPasswordErr] = useState(false);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  const registerChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'password') {
      setPasswordErr(!regexTests.password.test(value));
    }
    setRegisterData({ ...registerData, [name]: value });
  };

  if (regLoading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(fetchRegister(data));
      })}>
      <fieldset className="flex justify-center">
        <div className="grid gap-8 w-1/2">
          <TextField
            {...register('userName')}
            required
            name="userName"
            type="text"
            value={registerData.userName}
            onChange={registerChangeHandler}
            label={t('USER_NAME')}
            className="border-2"
          />
          <TextField
            {...register('email')}
            required
            name="email"
            type="text"
            value={registerData.email}
            onChange={registerChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
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
            label={t('CONFIRM_PASSWORD')}
            className="border-2"
          />
          <TextField
            {...register('phoneNumber')}
            inputProps={{ maxLength: 11, minLength: 11 }}
            required
            type="text"
            name="phoneNumber"
            value={registerData.phoneNumber}
            onChange={registerChangeHandler}
            label={t('TEL_NUM')}
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
            {t('LOGIN_SEND')}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

export default RegisterContent;
