import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/thunks/Admin';
import regexTests from 'PageContent/utils/Regex';

function AddUserForm() {
  const { t } = useTranslation('adminUser');

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const addUserObj = {
    email: 'af@gmail.com',
    password: 'Aa123456',
    password_confirmation: 'Aa123456',
    userName: 'Jancsi',
    phoneNumber: '06301111111'
  };

  const [addUserData, setAddUserData] = useState(addUserObj);
  const [passwordErr, setPasswordErr] = useState(false);

  const addUserChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'password') {
      setPasswordErr(!regexTests.password.test(value));
    }
    setAddUserData({ ...addUserData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(addUser(data));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <TextField
            {...register('userName')}
            required
            name="userName"
            type="text"
            value={addUserData.userName}
            onChange={addUserChangeHandler}
            label={t('USER_NAME')}
            className="border-2"
          />
          <TextField
            {...register('email')}
            required
            name="email"
            type="text"
            value={addUserData.email}
            onChange={addUserChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
          <TextField
            {...register('password')}
            required
            name="password"
            type="password"
            value={addUserData.password}
            error={passwordErr}
            helperText={passwordErr && t('PASSWORD_STRENGHT')}
            onChange={addUserChangeHandler}
            label={t('PASSWORD')}
            className="border-2"
          />
          <TextField
            {...register('password_confirmation')}
            required
            name="password_confirmation"
            type="password"
            error={addUserData.password !== addUserData.password_confirmation}
            helperText={
              addUserData.password !== addUserData.password_confirmation && t('PASSWORD_MISSMATCH')
            }
            value={addUserData.password_confirmation}
            onChange={addUserChangeHandler}
            label={t('CONFIRM_PASSWORD')}
            className="border-2"
          />
          <TextField
            {...register('phoneNumber')}
            inputProps={{ maxLength: 11, minLength: 11 }}
            required
            type="text"
            name="phoneNumber"
            value={addUserData.phoneNumber}
            onChange={addUserChangeHandler}
            label={t('TEL_NUM')}
            className="border-2"
          />
          <Button
            variant="contained"
            color="info"
            disabled={passwordErr || addUserData.password !== addUserData.password_confirmation}
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
