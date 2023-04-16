import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addLocation } from 'redux/thunks/Location';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import districts from 'PageContent/utils/Districts';

function LocationAddForm({ handleClose }) {
  const { t } = useTranslation('rootData');
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const locationObj = {
    name: '',
    postcode: '',
    district: '',
    street: '',
    houseNumber: '',
    floor: '',
    room: ''
  };

  const [locationData, setLocationData] = useState(locationObj);

  const locationChangeHandler = (event) => {
    const {
      target: { name, value }
    } = event;
    setLocationData({ ...locationData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(addLocation(data)).then(() => {
          handleClose();
        });
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <TextField
            {...register('name')}
            required
            autoComplete="on"
            name="name"
            type="text"
            value={locationData.name}
            onChange={locationChangeHandler}
            label={t('NAME')}
            className="border-2"
          />
          <TextField
            {...register('postcode')}
            required
            autoComplete="on"
            inputProps={{ max: 9985, min: 1011 }}
            name="postcode"
            type="number"
            value={locationData.postCode}
            onChange={locationChangeHandler}
            label={t('POST_CODE')}
            className="border-2"
          />
          <FormControl>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('DISTRICT')}
            </InputLabel>
            <Select
              {...register('district')}
              value={locationData.district}
              name="district"
              notched={true}
              label={t('DISTRICT')}
              onChange={locationChangeHandler}>
              {Object.values(districts).map((disctrict) => (
                <MenuItem key={disctrict} value={disctrict}>
                  {`${disctrict} ${t('DISTRICT')}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            {...register('street')}
            required
            name="street"
            type="text"
            autoComplete="on"
            value={locationData.street}
            onChange={locationChangeHandler}
            label={t('STREET')}
            className="border-2"
          />
          <TextField
            {...register('houseNumber')}
            required
            autoComplete="on"
            name="houseNumber"
            type="number"
            value={locationData.houseNumber}
            onChange={locationChangeHandler}
            label={t('HOUSE_NUMBER')}
            className="border-2"
          />
          <TextField
            {...register('floor')}
            inputProps={{ maxLength: 3 }}
            name="floor"
            autoComplete="on"
            type="text"
            value={locationData.floor}
            onChange={locationChangeHandler}
            label={t('FLOOR')}
            className="border-2"
          />
          <TextField
            {...register('room')}
            inputProps={{ maxLength: 20 }}
            name="room"
            autoComplete="on"
            type="text"
            value={locationData.room}
            onChange={locationChangeHandler}
            label={t('ROOM')}
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
export default LocationAddForm;
