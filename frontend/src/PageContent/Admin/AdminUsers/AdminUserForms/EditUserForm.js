import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRegister } from 'redux/thunks/Auth';
import { updateUser } from 'redux/thunks/Admin';

function EditUserForm({ user }) {
  console.log(user);
  const { t } = useTranslation('adminUser');

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState(user.email);
  const [faults, setFaults] = useState(user.faults);
  const [confirmed, setConfirmed] = useState(user.confirmed);
  const [felNev, setFelNev] = useState(user.fel_nev);
  const [phonNum, setPhonNum] = useState(user.telefonszam);
  const [level, setLevel] = useState(user.level);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const faultsChangeHandler = (event) => {
    setFaults(event.target.value);
  };
  const ConfirmedChangeHandler = (event) => {
    setConfirmed(event.target.value);
  };
  const felNevChangeHandler = (event) => {
    setFelNev(event.target.value);
  };
  const phonNumChangeHandler = (event) => {
    setPhonNum(event.target.value);
  };
  const levelChangeHandler = (event) => {
    setLevel(event.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.confirmed = false;
        data.faults = 0;
        data.level;
        dispatch(updateUser({ formData: data, id: user.id }));
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
            {...register('faults')}
            required
            type="text"
            value={faults}
            onChange={faultsChangeHandler}
            label={t('FAULTS')}
            className="border-2"
          />
          <TextField
            {...register('confirmed')}
            required
            type="text"
            value={confirmed}
            onChange={ConfirmedChangeHandler}
            label={t('CONFIRMED')}
            className="border-2"
          />
          <TextField
            {...register('telefonszam')}
            required
            type="text"
            value={phonNum}
            onChange={phonNumChangeHandler}
            label={t('PHONENUMBER')}
            className="border-2"
          />
          <Select
            {...register('level')}
            value={level}
            onChange={levelChangeHandler}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={1}>{t('Admin')}</MenuItem>
            <MenuItem value={2}>{t('USER')}</MenuItem>
          </Select>
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
