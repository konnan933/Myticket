import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

function EditEventLocation({ location }) {
  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);
  const width = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('userEvent');
  const [locationName, setLocationName] = useState(location.locationName);
  const [locationNameinput, setLocationNameInput] = useState('');
  const { singleEvent } = useSelector((state) => state.event);
  const cantEdit =
    singleEvent.startDate <=
    moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD HH:mm:ss');
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

  if (cantEdit) {
    return (
      <div className="p-4">
        <Typography gutterBottom variant="h5" component="div">
          {`${t('LOCATION')}: ${location.locationName} (${location.postcode} ${
            location.district === undefined ? '' : location.district
          } ${location.street} ${t('STREET')} ${location.houseNumber})`}
        </Typography>
      </div>
    );
  }
  return (
    <div className="p-4">
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
            <IconButton color="error" onClick={() => setIsEdit(false)}>
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
          {width && (
            <div>
              <Typography variant="inherit" component="div">
                {t('CLICK_EDIT')}
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default EditEventLocation;
