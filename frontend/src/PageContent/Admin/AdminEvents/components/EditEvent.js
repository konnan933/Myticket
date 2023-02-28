import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import Addimage from 'PageContent/utils/AddImage';
import { putEvent } from 'redux/thunks/Admin';
import Loader from 'PageContent/utils/Loader';
import CloseIcon from '@mui/icons-material/Close';

function EditEvent({ event }) {
  const { t } = useTranslation('adminEvent');

  const { register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [eventName, setEventName] = useState(event.cim);
  const [buisnessEmail, setBuisnessEmail] = useState(event.buisness_email);
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState(event.buisness_tel);
  const [eventDescription, setEventDescription] = useState(event.leiras);
  const [eventType, setEventType] = useState(event.ekId);
  const [organizerName, setOrganizername] = useState(event.fel_nev);
  const [organizerNameinput, setOrganizerInput] = useState('');
  const [locationName, setLocationName] = useState(event.locationName);
  const [locationNameinput, setLocationNameInput] = useState('');
  const [imageId, setImageId] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [endDateErrorMsg, setEndDateErrorMsg] = useState('');

  const date = moment(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-DDTHH:mm');
  const [startDate, setStartDate] = useState(moment(event.kezd_datum).format('yyyy-MM-DDTHH:mm'));
  const endDate = moment(event.veg_datum).format('yyyy-MM-DDTHH:mm');

  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);
  const { userNames, userNamesLoading } = useSelector((state) => state.admin);
  const { eventTypes, eventTypesLoading } = useSelector((state) => state.eventTypes);

  const isEventImage = event.kep === null || event.kep === undefined;

  const datasLoading = userNamesLoading || eventTypesLoading || locationNamesLoading;

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
    } else {
      setEndDateError(false);
      setEndDateErrorMsg('');
    }
  };
  return (
    <div>
      <div>
        <IconButton onClick={handleOpen} color="primary">
          <CreateIcon />
        </IconButton>
      </div>
      <div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal" aria-describedby="modal">
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              display: 'block',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxHeight: '90%',
              overflow: 'scroll',
              bgcolor: 'white',
              boxShadow: 24,
              borderRadius: 7
            }}>
            {datasLoading ? (
              <Loader />
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-end">
                  <IconButton color="error" onClick={handleClose}>
                    <CloseIcon fontSize="medium" />
                  </IconButton>
                </div>
                <div className="flex justify-center">
                  <h2>{t('EDIT_EVENT')}</h2>
                </div>
                <div className="flex justify-center">
                  <form
                    className="w-4/5"
                    onSubmit={handleSubmit((data) => {
                      data.id = event.eventId;
                      data.kezd_datum = moment(data.kezd_datum).format('YYYY-MM-DD hh:mm:ss');
                      data.veg_datum = moment(data.veg_datum).format('YYYY-MM-DD hh:mm:ss');
                      data.user =
                        organizerName.id === undefined ? event.organizerId : organizerName.id;
                      data.helyszin =
                        locationName.id === undefined ? event.locationId : locationName.id;
                      data.kep = imageId;
                      dispatch(putEvent(data, event.id));
                    })}>
                    <fieldset>
                      <div className="flex justify-center pb-9">
                        <TextField
                          {...register('cim')}
                          required
                          autoComplete="on"
                          type="text"
                          value={eventName}
                          onChange={eventNameChangeHandler}
                          label={t('EVENT_NAME')}
                          className="border-2 w-full mt-5"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <Autocomplete
                          options={userNames}
                          getOptionLabel={(option) =>
                            option.fel_nev ? option.fel_nev : event.fel_nev
                          }
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
                            <TextField
                              required
                              value={organizerName}
                              {...params}
                              label={t('ORGANIZER')}
                            />
                          )}
                        />
                        <Autocomplete
                          className="w-full"
                          options={locationNames}
                          getOptionLabel={(option) =>
                            option.name ? option.name : event.locationName
                          }
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
                              required
                              value={locationName}
                              {...params}
                              label={t('LOCATION')}
                            />
                          )}
                        />

                        <TextField
                          {...register('buisness_email')}
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
                            {...register('esem_kat')}
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
                          {...register('buisness_tel')}
                          required
                          autoComplete="on"
                          type="text"
                          value={buisnessPhoneNum}
                          onChange={buisnessPhoneNumChangeHandler}
                          label={t('BUISNESS_PHONE_NUMBER')}
                          className="border-2"
                        />

                        <TextField
                          {...register('kezd_datum')}
                          error={startDateError}
                          defaultValue={startDate}
                          onSelect={(event) => setStartDate(event.target.value)}
                          InputLabelProps={{ shrink: true }}
                          onChange={startDateChangeHandler}
                          helperText={startDateErrorMsg}
                          label={t('START_DATE')}
                          type="datetime-local"
                          className="border-2 px-2 pt-2"
                        />

                        <TextField
                          {...register('veg_datum')}
                          InputLabelProps={{ shrink: true }}
                          onChange={endDateChangeHandler}
                          error={endDateError}
                          defaultValue={endDate}
                          helperText={endDateErrorMsg}
                          label={t('END_DATE')}
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
                      {isEventImage && <Addimage setImageId={setImageId} />}
                    </fieldset>
                    <div className="flex justify-center p-9">
                      <Button
                        disabled={errors}
                        variant="contained"
                        color="info"
                        className=" w-48"
                        aria-label="Event edit"
                        type="submit"
                        size="lagre">
                        {t('UPDATE_EVENT')}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditEvent;
