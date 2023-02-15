import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from 'redux/thunks/Admin';

function AddEventForm() {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [eventName, setEventName] = useState('');
  const [buisnessEmail, setBuisnessEmail] = useState('');
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setlocation] = useState('');
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { eventTypes, userNames } = useSelector((state) => state.admin);

  const date = moment(new Date()).format('YYYY-MM-DDTkk:mm');

  const eventNameChangeHandler = (event) => {
    setEventName(event.target.value);
  };

  const buisnessEmailChangeHandler = (event) => {
    setBuisnessEmail(event.target.value);
  };

  const buisnessPhoneNumChangeHandler = (event) => {
    setBuisnessPhoneNum(event.target.value);
  };

  const eventDescriptionChangeHandler = (event) => {
    setEventDescription(event.target.value);
  };
  const eventTypeChangeHandler = (event) => {
    setEventType(event.target.value);
  };

  const locationChangeHandler = (event) => {
    setlocation(event.target.value);
  };

  return (
    <div className="flex justify-start pl-72">
      <form
        onSubmit={handleSubmit((data) => {
          data.kezd_datum = moment(data.kezd_datum).format('YYYY-MM-DD hh:mm:ss');
          data.veg_datum = moment(data.veg_datum).format('YYYY-MM-DD hh:mm:ss');
          data.user = value.id;
          data.kep = 1;
          data.helyszin = parseInt(data.helyszin);
          console.log(data);
          dispatch(addEvent(data));
        })}>
        <fieldset>
          <div className="grid grid-cols-3 gap-12">
            <TextField
              {...register('cim')}
              required
              type="text"
              value={eventName}
              onChange={eventNameChangeHandler}
              label={t('EVENT_NAME')}
              className="border-2"
            />

            <Select
              {...register('esem_kat')}
              value={eventType}
              onChange={eventTypeChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              {eventTypes.map((eventType) => (
                <MenuItem key={eventType.id} value={eventType.id}>
                  {eventType.megnev}
                </MenuItem>
              ))}
            </Select>

            <Autocomplete
              options={userNames}
              getOptionLabel={(option) => (option.fel_nev ? option.fel_nev : '')}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="organizer-name_picker"
              renderInput={(params) => <TextField value={value} {...params} label="Controllable" />}
            />

            <TextField
              {...register('buisness_email')}
              required
              type="email"
              value={buisnessEmail}
              onChange={buisnessEmailChangeHandler}
              label={t('BUISNESS_EMAIL')}
              className="border-2"
            />

            <TextField
              {...register('buisness_tel')}
              required
              type="text"
              value={buisnessPhoneNum}
              onChange={buisnessPhoneNumChangeHandler}
              label={t('BUISNESS_PHONE_NUMBER')}
              className="border-2"
            />

            <TextField
              {...register('helyszin')}
              required
              type="numb"
              value={location}
              onChange={locationChangeHandler}
              label={t('Location')}
              className="border-2"
            />

            <TextField
              {...register('kezd_datum')}
              required
              defaultValue={date}
              label="asd"
              type="datetime-local"
              className="border-2 px-2 pt-2"
            />

            <TextField
              {...register('veg_datum')}
              required
              defaultValue={date}
              label="asd"
              type="datetime-local"
              className="border-2 px-2 pt-2"
            />
          </div>
          <TextareaAutosize
            {...register('leiras')}
            required
            type="text"
            value={eventDescription}
            onChange={eventDescriptionChangeHandler}
            placeholder={t('DESCRIPTION')}
            className="border-2 w-full p-3 mt-5"
          />
        </fieldset>
        <div className="flex justify-center pt-6">
          <Button
            variant="contained"
            color="info"
            className=" w-28"
            aria-label="Sign in"
            type="submit"
            size="lagre">
            {t('LOGIN_SEND')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;
