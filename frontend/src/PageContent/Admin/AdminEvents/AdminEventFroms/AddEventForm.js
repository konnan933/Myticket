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
import Addimage from '../../../utils/AddImage';
import { useState } from 'react';
import { addEvent } from 'redux/thunks/Event';

function AddEventForm() {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();

  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);
  const { userNames, userNamesLoading } = useSelector((state) => state.admin);
  const { eventTypes } = useSelector((state) => state.eventTypes);

  const { register, handleSubmit } = useForm();

  const [eventName, setEventName] = useState('');
  const [buisnessEmail, setBuisnessEmail] = useState('');
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  //Auto compelte useStates
  const [organizerName, setOrganizername] = useState('');
  const [organizerNameinput, setOrganizerInput] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationNameinput, setLocationNameInput] = useState('');
const { imageId } = useSelector((state) => state.picture);

  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [endDateErrorMsg, setEndDateErrorMsg] = useState('');
  const [startDate, setStartDate] = useState('');

  const date = moment(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-DDTHH:mm');

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
      <div className="flex justify-center pb-16">
        <h2>{t('ADD_EVENT')}</h2>
      </div>
      <div className="flex justify-center">
        <form
          className="w-2/5 max-md:w-3/4"
          onSubmit={handleSubmit((data) => {
            data.startDate = moment(data.startDate).format('YYYY-MM-DD hh:mm:ss');
            data.endDate = moment(data.endDate).format('YYYY-MM-DD hh:mm:ss');
            data.user = organizerName.id;
            data.location = locationName.id;
            data.image = imageId;
            dispatch(addEvent(data));
          })}>
          <fieldset>
            <div className="flex justify-center max-md:pb-5 pb-16">
              <TextField
                {...register('title')}
                required
                autoComplete="on"
                type="text"
                value={eventName}
                onChange={eventNameChangeHandler}
                label={t('EVENT_NAME')}
                className="border-2 w-full mt-5"
              />
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-16 max-md:gap-5">
              <Autocomplete
                className="w-full"
                loading={userNamesLoading}
                options={userNames}
                getOptionLabel={(option) => (option.userName ? option.userName : '')}
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
                  <TextField required value={organizerName} {...params} label={t('ORGANIZER')} />
                )}
              />
              <Autocomplete
                className="w-full"
                loading={locationNamesLoading}
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
                  <TextField required value={locationName} {...params} label={t('LOCATION')} />
                )}
              />

              <TextField
                {...register('email')}
                required
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
                      {t(`EVENT_TYPE_${eventType.id}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                {...register('phoneNumber')}
                required
                autoComplete="on"
                type="text"
                value={buisnessPhoneNum}
                onChange={buisnessPhoneNumChangeHandler}
                label={t('BUISNESS_PHON_NUM')}
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
            <Addimage  />
          </fieldset>
          <div className="flex justify-center pt-4 p-2">
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

export default AddEventForm;
