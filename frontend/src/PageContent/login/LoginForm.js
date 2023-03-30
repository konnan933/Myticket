import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchLogin } from 'redux/thunks/Auth';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation('login');

  const loginObj = {
    email: 'konnan933@gmail.com',
    password: 'Aa123456@',
    rememberMe: true
  };
  const [loginData, setLoginData] = useState(loginObj);

  const dispatch = useDispatch();

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
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(fetchLogin({ data, rememberMe: loginData.rememberMe }));
      })}
      className="w-full">
      <fieldset className=" flex justify-center items-center">
        <div className="grid gap-8 w-4/6">
          <TextField
            autoComplete="on"
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
              control={
                <Checkbox
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={loginChangeHandler}
                />
              }
              label={t('REMEMBER_ME')}
            />
          </FormGroup>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginForm;
