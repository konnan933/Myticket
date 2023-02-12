import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { fetchRegister } from 'redux/thunks/Auth';

function RegisterContent() {
  const { t } = useTranslation('register');

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { regLoading, reg } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('af@gmail.com');
  const [password, setPassword] = useState('Aa123456');
  const [confirmPassword, setConfirmPassword] = useState('Aa123456');
  const [felNev, setFelNev] = useState('Jancsi');
  const [phonNum, setPhonNum] = useState('06301111111');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const ConfirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const felNevChangeHandler = (event) => {
    setFelNev(event.target.value);
  };
  const phonNumChangeHandler = (event) => {
    setPhonNum(event.target.value);
  };

  if (regLoading) {
    return (
      // TODO CSS FIX hogy kozépen legyen
      <div className="w-full flex justify-center items-center">
        <HashLoader color="#FBC95C" size={150} />
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(fetchRegister(data));
      })}>
      <fieldset className="flex justify-center">
        <div className="grid gap-8 p-20 w-1/2">
          <TextField
            {...register('fel_nev')}
            required
            type="text"
            value={felNev}
            onChange={felNevChangeHandler}
            label={t('TEL_NUM')}
            className="border-2"
          />
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
          <TextField
            {...register('password_confirmation')}
            required
            type="password"
            value={confirmPassword}
            onChange={ConfirmPasswordChangeHandler}
            label={t('PASSWORD')}
            className="border-2"
          />
          <TextField
            {...register('telefonszam')}
            required
            type="text"
            value={phonNum}
            onChange={phonNumChangeHandler}
            label={t('TEL_NUM')}
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

export default RegisterContent;
