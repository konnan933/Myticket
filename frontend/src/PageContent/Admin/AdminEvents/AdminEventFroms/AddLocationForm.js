import { Button, Checkbox, MenuItem, Select, TextField } from '@mui/material';
import Disctricts from 'PageContent/utils/Districts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addLocation, getLocationNames } from 'redux/thunks/Admin';

function AddLocationForm() {
  const dispatch = useDispatch();

  const [locationNaming, setLocationNaming] = useState('');
  const [postcode, setPostcode] = useState('');
  const [disctrict, setDisctrict] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [newLocation, setNewLocation] = useState(false);
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation('adminEvent');

  const locationNamingChangeHandler = (event) => {
    setLocationNaming(event.target.value);
  };

  const postcodeChangeHandler = (event) => {
    setPostcode(event.target.value);
  };

  const disctrictChangeHandler = (event) => {
    setDisctrict(event.target.value);
  };

  const handelNewLocation = () => {
    setNewLocation(!newLocation);
  };

  const streetChangeHandler = (event) => {
    setStreet(event.target.value);
  };
  const streetNumberChangeHandler = (event) => {
    setStreetNumber(event.target.value);
  };
  const floorChangeHandler = (event) => {
    setFloor(event.target.value);
  };

  const roomChangeHandler = (event) => {
    setRoom(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(addLocation(data)).then((respone) => {
            dispatch(getLocationNames());
          });
        })}>
        <div className="flex justify-center">
          <h2>{t('ADD_LOCATION')}</h2>
          <Checkbox onChange={handelNewLocation} />
        </div>

        {newLocation && (
          <div className="flex justify-center">
            <div className="p-14 border-2 rounded-xl m-14 w-1/2 ">
              <h2 className="flex justify-start pb-16">{t('ADD_LOCATION')}</h2>
              <div className="grid grid-cols-2 gap-16">
                <TextField
                  {...register('name')}
                  required
                  type="text"
                  value={locationNaming}
                  onChange={locationNamingChangeHandler}
                  label={t('LOCATION_NAMING')}
                  className="border-2"
                />
                <TextField
                  {...register('postcode')}
                  required
                  type="number"
                  value={postcode}
                  onChange={postcodeChangeHandler}
                  label={t('POSTCODE')}
                  className="border-2"
                />
                <Select
                  {...register('kerulet')}
                  value={disctrict}
                  onChange={disctrictChangeHandler}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  {Object.values(Disctricts).map((disctrict) => (
                    <MenuItem key={disctrict} value={disctrict}>
                      {`${disctrict} ${t('DISCTRICT')}`}
                    </MenuItem>
                  ))}
                </Select>
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
                  value={streetNumber}
                  onChange={streetNumberChangeHandler}
                  label={t('STREETNUMBER')}
                  className="border-2"
                />
                <TextField
                  {...register('floor')}
                  required
                  type="number"
                  value={floor}
                  onChange={floorChangeHandler}
                  label={t('FLOOR')}
                  className="border-2"
                />
                <TextField
                  {...register('room')}
                  required
                  type="text"
                  value={room}
                  onChange={roomChangeHandler}
                  label={t('ROOM')}
                  className="border-2"
                />
              </div>
              <div className="flex justify-center pt-9">
                <Button
                  variant="contained"
                  color="info"
                  className=" w-1/3"
                  aria-label="Loaction add"
                  type="sumbit"
                  size="large">
                  {t('SEND_LOCATION')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddLocationForm;
