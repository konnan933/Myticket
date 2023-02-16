import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateLocation } from 'redux/thunks/Location';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import districts from 'PageContent/utils/Districts';

function LocationEditForm({ location }) {
  const { t } = useTranslation('rootData');
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const [name, setName] = useState(location.name);
  const [postCode, setPostCode] = useState(location.postcode);
  const [district, setDistrict] = useState(location.district);
  const [street, setStreet] = useState(location.street);
  const [houseNumber, setHouseNumber] = useState(location.housenumber);
  const [floor, setFloor] = useState(location.floor);
  const [room, setRoom] = useState(location.room);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const postCodeChangeHandler = (event) => {
    setPostCode(event.target.value);
  };
  const districtChangeHandler = (event) => {
    setDistrict(event.target.value);
  };
  const streetChangeHandler = (event) => {
    setStreet(event.target.value);
  };
  const houseNumberChangeHandler = (event) => {
    setHouseNumber(event.target.value);
  };
  const floorChangeHandler = (event) => {
    setFloor(event.target.value);
  };
  const roomChangeHandler = (event) => {
    setRoom(event.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.id = location.id;
        dispatch(updateLocation(data));
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
          <TextField
            {...register('postcode')}
            required
            type="number"
            value={postCode}
            onChange={postCodeChangeHandler}
            label={t('POST_CODE')}
            className="border-2"
          />
          <FormControl>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('DISTRICT')}
            </InputLabel>
            <Select
              {...register('district')}
              value={district}
              notched={true}
              label={t('DISTRICT')}
              onChange={districtChangeHandler}>
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
            type="text"
            value={street}
            onChange={streetChangeHandler}
            label={t('STREET')}
            className="border-2"
          />
          <TextField
            {...register('housenumber')}
            required
            type="number"
            value={houseNumber}
            onChange={houseNumberChangeHandler}
            label={t('HOUSE_NUMBER')}
            className="border-2"
          />
          <TextField
            {...register('floor')}
            type="text"
            value={floor}
            onChange={floorChangeHandler}
            label={t('FLOOR')}
            className="border-2"
          />
          <TextField
            {...register('room')}
            type="text"
            value={room}
            onChange={roomChangeHandler}
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
export default LocationEditForm;
