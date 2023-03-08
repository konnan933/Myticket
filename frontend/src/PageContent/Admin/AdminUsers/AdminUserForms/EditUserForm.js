import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/thunks/Admin';

function EditUserForm({ user }) {
  const { t } = useTranslation('adminUser');

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const editUserObj = {
    email: user.email,
    faults: user.faults,
    confirmed: user.confirmed,
    userName: user.userName,
    phoneNumber: user.phoneNumber,
    level: user.level
  };

  const [editUserData, setEditUserData] = useState(editUserObj);

  const editUserChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    setEditUserData({ ...editUserData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(updateUser({ formData: data, id: user.id }));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <TextField
            {...register('userName')}
            required
            name="userName"
            type="text"
            value={editUserData.userName}
            onChange={editUserChangeHandler}
            label={t('USER_NAME')}
            className="border-2"
          />
          <TextField
            {...register('email')}
            required
            name="email"
            type="text"
            value={editUserData.email}
            onChange={editUserChangeHandler}
            label={t('EMAIL')}
            className="border-2"
          />
          <TextField
            {...register('faults')}
            required
            name="faults"
            inputProps={{ max: 5 }}
            type="number"
            value={editUserData.faults}
            onChange={editUserChangeHandler}
            label={t('FAULTS')}
            className="border-2"
          />
          <FormControl>
            <InputLabel shrink>{t('CONFIRMED')}</InputLabel>
            <Select
              {...register('confirmed')}
              value={editUserData.confirmed}
              name="confirmed"
              notched
              label={t('CONFIRMED')}
              onChange={editUserChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={1}>{t('ACCEPTED')}</MenuItem>
              <MenuItem value={0}>{t('DECLINED')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...register('phoneNumber')}
            required
            name="phoneNumber"
            type="text"
            value={editUserData.phoneNumber}
            onChange={editUserChangeHandler}
            label={t('PHONENUMBER')}
            className="border-2"
          />
          <FormControl>
            <InputLabel shrink>{t('LEVEL')}</InputLabel>
            <Select
              {...register('level')}
              value={editUserData.level}
              name="level"
              label={t('LEVEL')}
              onChange={editUserChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={1}>{t('LEVEL_1')}</MenuItem>
              <MenuItem value={2}>{t('LEVEL_2')}</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="info"
            className=" w-full mt-16"
            aria-label="Sign in"
            type="submit"
            size="large">
            {t('SEND')}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

export default EditUserForm;
