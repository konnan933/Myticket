import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from 'redux/thunks/Admin';
import { useState } from 'react';
import Addimage from 'PageContent/utils/AddImage';
import UserAddLocation from './UserAddEventForm/UserAddLocation';

function UserAddEventForm() {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [eventName, setEventName] = useState('');
  const [buisnessEmail, setBuisnessEmail] = useState('');
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const organizerName = 'ASD';
  const [locationName, setLocationName] = useState('');
  const { locationNames } = useSelector((state) => state.location);
  const [locationNameinput, setLocationNameInput] = useState('');
  const [imageId, setImageId] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [endDateErrorMsg, setEndDateErrorMsg] = useState('');
  const date = moment(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-DDTHH:mm');
  const [startDate, setStartDate] = useState('');
  const { eventTypes } = useSelector((state) => state.eventTypes);

  const errors = startDateError || endDateError;

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

  const startDateChangeHandler = (event) => {
    if (event.target.value <= date) {
      setStartDateError(true);
      setStartDateErrorMsg(t('START_DATE_LOWER'));
    } else {
      setStartDateError(false);
      setStartDateErrorMsg('');
    }
  };

  const endDateChangeHandler = (event) => {
    if (event.target.value <= startDate) {
      setEndDateError(true);
      setEndDateErrorMsg(t('END_DATE_LOWER_START_DATE'));
    } else if (event.target.value <= date) {
      setEndDateError(true);
      setEndDateErrorMsg(t('END_DATE_LOWER'));
    } else {
      setEndDateError(false);
      setEndDateErrorMsg('');
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <form
          className="w-2/5"
          onSubmit={handleSubmit((data) => {
            data.startDate = moment(data.startDate).format('YYYY-MM-DD hh:mm:ss');
            data.endDate = moment(data.endDate).format('YYYY-MM-DD hh:mm:ss');
            data.user = organizerName.id;
            data.location = locationName.id;
            data.image = imageId;
            dispatch(addEvent(data));
          })}>
          <fieldset>
            <div className="flex flex-col">
              <div className="flex">
                <TextField
                  {...register('title')}
                  required
                  helperText={t('EVENT_NAME_HELPER')}
                  autoComplete="on"
                  type="text"
                  value={eventName}
                  onChange={eventNameChangeHandler}
                  label={t('EVENT_NAME')}
                  className="border-2 w-full mt-5"
                />
              </div>
              <div className="flex justify-center p-5">
                <UserAddLocation />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <TextField
                defaultValue={organizerName}
                disabled
                label={t('ORGANIZER')}
                className="border-2"
              />
              <Autocomplete
                className="w-full"
                options={locationNames}
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                  <TextField
                    helperText={t('USER_LOCATION_ADD')}
                    required
                    value={locationName}
                    {...params}
                    label={t('LOCATION')}
                  />
                )}
              />

              <TextField
                {...register('email')}
                required
                helperText={t('USER_BUISNESS_EMAIL')}
                type="email"
                autoComplete="on"
                value={buisnessEmail}
                onChange={buisnessEmailChangeHandler}
                label={t('BUISNESS_EMAIL')}
                className="border-2"
              />

              <FormControl>
                <InputLabel shrink={true} id="demo-simple-select-label">
                  {t('EVENT_TYPE')}
                </InputLabel>
                <Select
                  {...register('eventType')}
                  value={eventType}
                  notched={true}
                  required
                  label={t('EVENT_TYPE')}
                  onChange={eventTypeChangeHandler}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  {eventTypes.map((eventType) => (
                    <MenuItem key={eventType.id} value={eventType.id}>
                      {eventType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                {...register('phoneNumber')}
                required
                helperText={t('USER_BUISNESS_PHONE')}
                autoComplete="on"
                type="text"
                value={buisnessPhoneNum}
                onChange={buisnessPhoneNumChangeHandler}
                label={t('BUISNESS_PHONE_NUMBER')}
                className="border-2"
              />

              <TextField
                {...register('startDate')}
                error={startDateError}
                defaultValue={date}
                onSelect={(event) => setStartDate(event.target.value)}
                InputLabelProps={{ shrink: true }}
                onChange={startDateChangeHandler}
                helperText={startDateErrorMsg}
                label={t('START_DATE')}
                type="datetime-local"
                className="border-2 px-2 pt-2"
              />

              <TextField
                {...register('endDate')}
                InputLabelProps={{ shrink: true }}
                onChange={endDateChangeHandler}
                error={endDateError}
                helperText={endDateErrorMsg}
                label={t('END_DATE')}
                type="datetime-local"
                className="border-2 px-2 pt-2"
              />
            </div>
            <TextareaAutosize
              {...register('description')}
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
              disabled={errors}
              variant="contained"
              color="info"
              className=" w-48"
              aria-label="Event add"
              type="submit"
              size="lagre">
              {t('SEND_EVENT')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAddEventForm;
