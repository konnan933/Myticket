import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredEvent } from 'redux/thunks/Event';

function Filters() {
  const { t } = useTranslation('home');
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationNameinput, setLocationNameInput] = useState('');

  const { eventTypes } = useSelector((state) => state.eventTypes);
  const { locationNames } = useSelector((state) => state.location);

  const [today, setToday] = useState(new Date());

  useEffect(() => {
    setToday(moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD'));
  }, []);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const eventTypeChangeHandler = (event) => {
    setEventType(event.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(
            getFilteredEvent({
              date: data.date === '' ? '*' : data.date,
              eventType: data.eventType === '' ? '*' : data.eventType,
              location:
                locationName.id === '' || locationName.id === undefined ? '*' : locationName.id
            })
          );
        })}
        className="w-4/5 flex gap-10 max-md:flex-col justify-center  ">
        <TextField
          type="date"
          {...register('date')}
          value={date}
          onSelect={(event) => setDate(event.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: today
          }}
          onChange={dateChangeHandler}
          label={t('DATE')}
          className="w-1/4 max-md:w-full border-2 px-2 pt-2"></TextField>
        <Autocomplete
          className="w-1/3 max-md:w-full"
          options={locationNames}
          {...register('locationName')}
          getOptionLabel={(option) => (option.name ? option.name : '')}
          value={locationName}
          onChange={(event, newValue) => {
            console.log(newValue);
            setLocationName(newValue);
          }}
          inputValue={locationNameinput}
          onInputChange={(event, newInputValue) => {
            setLocationNameInput(newInputValue);
          }}
          id="location-name_picker"
          renderInput={(params) => (
            <TextField value={locationName} {...params} label={t('LOCATION')} />
          )}
        />
        <FormControl className="w-1/3 max-md:w-full">
          <InputLabel shrink={true} id="demo-simple-select-label">
            {t('EVENT_TYPE')}
          </InputLabel>
          <Select
            {...register('eventType')}
            value={eventType}
            notched={true}
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
        <Button
          variant="contained"
          color="info"
          className="max-md:w-full"
          aria-label="Event add"
          type="submit"
          size="lagre">
          {t('SEARCH')}
        </Button>
      </form>
    </div>
  );
}

export default Filters;
