import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { fetchLogin } from 'redux/thunks/Auth';

function LoginContent() {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation('login');

  const dispatch = useDispatch();
  const { loginLoading, login } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('student1@gmail.com');
  const [password, setPassword] = useState('Aa123456');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  // ! student1@gmail.com;
  // ! Aa123456;
  if (loginLoading) {
    return (
      // TODO CSS FIX hogy kozépen legyen
      <div className="w-full flex justify-center items-center">
        <HashLoader color="#FBC95C" size={150} />
      </div>
    );
  }
  if (login[0].email !== undefined) {
    return <Navigate to="/" />;
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(fetchLogin(data));
      })}>
      <fieldset className="flex justify-center">
        <div className="grid gap-8 p-20 w-1/2">
          <TextField
            {...register('email')}
            required
            type="text"
            value={email}
            onChange={emailChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
          <TextField
            {...register('password')}
            required
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            label={t('PASSWORD')}
            className="border-2"
          />
          <Button
            variant="contained"
            color="info"
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

export default LoginContent;
