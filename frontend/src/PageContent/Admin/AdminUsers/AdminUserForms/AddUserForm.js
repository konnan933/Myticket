import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/thunks/Admin';

function AddUserForm() {
  const { t } = useTranslation('adminUser');

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('af@gmail.com');
  const [password, setPassword] = useState('Aa123456@');
  const [confirmPassword, setConfirmPassword] = useState('Aa123456@');
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
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(addUser(data));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <TextField
            {...register('fel_nev')}
            required
            type="text"
            value={felNev}
            onChange={felNevChangeHandler}
            label={t('USER_NAME')}
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
            label={t('CONFRIM_PASSWORD')}
            className="border-2"
          />
          <TextField
            {...register('telefonszam')}
            required
            type="text"
            value={phonNum}
            onChange={phonNumChangeHandler}
            label={t('PHONE_NUMBER')}
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

export default AddUserForm;
