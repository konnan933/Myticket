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
import { useSelector } from 'react-redux';

function Filters() {
  const { t } = useTranslation('home');
  const { register, handleSubmit } = useForm();

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
    <div className="w-full">
      <form onSubmit={handleSubmit(() => {})} className="flex gap-10 ">
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
          className="w-1/4 border-2 px-2 pt-2">
          datum
        </TextField>
        <Autocomplete
          className="w-1/3"
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
            <TextField value={locationName} {...params} label={t('LOCATION')} />
          )}
        />
        <FormControl className="w-1/3">
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
        <Button
          variant="contained"
          color="info"
          className=" w-48"
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
