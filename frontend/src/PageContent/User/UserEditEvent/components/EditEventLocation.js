import { Autocomplete, Button, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';
import CloseIcon from '@mui/icons-material/Close';

function EditEventLocation({ location }) {
  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);
  const { t } = useTranslation('userEvent');
  const { register } = useForm();
  const [locationName, setLocationName] = useState(location.locationName);
  const [locationNameinput, setLocationNameInput] = useState('');
  const { singleEvent } = useSelector((state) => state.event);
  const id = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent.location = locationName.id;
    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };

  return (
    <div>
      {isEdit ? (
        <form className="flex flex-row w-full p-4">
          <Autocomplete
            className="w-full"
            loading={locationNamesLoading}
            options={locationNames}
            getOptionLabel={(option) => (option.name ? option.name : location.locationName)}
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
          <div className="flex justify-between">
            <IconButton onClick={() => setIsEdit(false)}>
              <CloseIcon />
            </IconButton>
            <Button onClick={handleOnSubmit}>{t('SAVE')}</Button>
          </div>
        </form>
      ) : (
        <div>
          <Typography
            className="cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300"
            onClick={() => setIsEdit(true)}
            gutterBottom
            variant="h5"
            component="div">
            {`${t('LOCATION')}: ${location.locationName} (${location.postcode} ${
              location.district === undefined ? '' : location.district
            } ${location.street} ${t('STREET')} ${location.houseNumber})`}
          </Typography>
        </div>
      )}
    </div>
  );
}
export default EditEventLocation;
