import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchLogin } from 'redux/thunks/Auth';

function LoginContent() {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation('login');

  const loginObj = {
    email: 'student1@gmail.com',
    password: 'Aa123456',
    rememberMe: false
  };
  const [loginData, setLoginData] = useState(loginObj);

  const dispatch = useDispatch();
  const { loginLoading, loggedIn } = useSelector((state) => state.auth);

  const loginChangeHandler = (event) => {
    const {
      target: { name, value, checked }
    } = event;
    switch (name) {
      case 'rememberMe':
        setLoginData({ ...loginData, [name]: checked });
        break;
      default:
        setLoginData({ ...loginData, [name]: value });
        break;
    }
  };
  // ! student1@gmail.com;
  // ! Aa123456;
  if (loginLoading) {
    return <Loader />;
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(fetchLogin({ data, rememberMe: loginData.rememberMe }));
      })}>
      <fieldset className="flex justify-center">
        <div className="grid gap-8 p-20 w-1/2">
          <TextField
            {...register('email')}
            required
            type="text"
            value={loginData.email}
            name="email"
            onChange={loginChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
          <TextField
            {...register('password')}
            required
            name="password"
            type="password"
            value={loginData.password}
            onChange={loginChangeHandler}
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="rememberMe" onChange={loginChangeHandler} />}
              label={t('REMEMBER_ME')}
            />
          </FormGroup>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginContent;
