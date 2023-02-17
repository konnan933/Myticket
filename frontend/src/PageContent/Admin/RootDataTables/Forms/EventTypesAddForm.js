import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEventType } from 'redux/thunks/EventTypes';

function EventTypesAddForm() {
  const { t } = useTranslation('rootData');
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(addEventType(data));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <TextField
            {...register('name')}
            required
            type="text"
            value={name}
            onChange={nameChangeHandler}
            label={t('NAME')}
            className="border-2"
          />
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
export default EventTypesAddForm;
