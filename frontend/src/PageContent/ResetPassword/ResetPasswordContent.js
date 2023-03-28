import { Button, TextField } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import regexTests from 'PageContent/utils/Regex';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRegister } from 'redux/thunks/Auth';
import { resettedPassword } from 'redux/thunks/User';

function ResetPasswordContent() {
  const { t } = useTranslation('profile');
  const { rndCodePassword } = useParams();
  const dispatch = useDispatch();
  const { resettedPasswordResponse, resettedPasswordLoading } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.auth);
  console.log(resettedPasswordResponse);

  useEffect(() => {
    if (loggedIn) {
      dispatch(resettedPassword(rndCodePassword));
    }
  }, [loggedIn]);

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
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(fetchRegister(data));
        })}
        className="w-full">
        <fieldset className="flex justify-center">
          <div className="grid gap-8 w-4/6">
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
              aria-label="Reset password"
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
