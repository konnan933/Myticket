import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from 'redux/thunks/Admin';
import Addimage from '../../../utils/AddImage';

function AddEventForm() {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [eventName, setEventName] = useState('');
  const [buisnessEmail, setBuisnessEmail] = useState('');
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [organizerName, setOrganizername] = useState('');
  const [organizerNameinput, setOrganizerInput] = useState('');
  const [locationName, setLocationName] = useState('');
  const { locationNames } = useSelector((state) => state.admin);
  const [locationNameinput, setLocationNameInput] = useState('');

  const [imageId, setImageId] = useState('');
  const [locationId, setLocationId] = useState('');

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
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center pb-16">
        <h2>{t('ADD_EVENT')}</h2>
      </div>
      <div className="flex justify-center">
        <form
          className="w-2/5"
          onSubmit={handleSubmit((data) => {
            data.kezd_datum = moment(data.kezd_datum).format('YYYY-MM-DD hh:mm:ss');
            data.veg_datum = moment(data.veg_datum).format('YYYY-MM-DD hh:mm:ss');
            data.user = organizerName.id;
            data.helyszin = locationName.id;
            data.kep = imageId;
            console.log(data);
            dispatch(addEvent(data));
          })}>
          <fieldset>
            <div className="flex justify-center pb-16">
              <TextField
                {...register('cim')}
                required
                type="text"
                value={eventName}
                onChange={eventNameChangeHandler}
                label={t('EVENT_NAME')}
                className="border-2 w-full mt-5"
              />
            </div>
            <div className="grid grid-cols-2 gap-16">
              <Autocomplete
                options={userNames}
                getOptionLabel={(option) => (option.fel_nev ? option.fel_nev : '')}
                value={organizerName}
                onChange={(event, newValue) => {
                  setOrganizername(newValue);
                }}
                inputValue={organizerNameinput}
                onInputChange={(event, newInputValue) => {
                  setOrganizerInput(newInputValue);
                }}
                id="organizer-name_picker"
                renderInput={(params) => (
                  <TextField value={organizerName} {...params} label="Controllable" />
                )}
              />
              <Autocomplete
                className="w-full"
                options={locationNames}
                getOptionLabel={(option) => (option.megnev ? option.megnev : '')}
                value={locationName}
                onChange={(event, newValue) => {
                  setLocationName(newValue);
                }}
                inputValue={locationNameinput}
                onInputChange={(event, newInputValue) => {
                  setLocationNameInput(newInputValue);
                }}
                id="location-name_picker"
                renderInput={(params) => (
                  <TextField value={locationName} {...params} label="Controllable" />
                )}
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
            <Addimage setImageId={setImageId} />
          </fieldset>
          <div className="flex justify-center pt-6">
            <Button
              variant="contained"
              color="info"
              className=" w-28"
              aria-label="Event add"
              type="submit"
              size="lagre">
              {t('LOGIN_SEND')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
