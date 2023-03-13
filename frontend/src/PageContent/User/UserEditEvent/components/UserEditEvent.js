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
import Loader from 'PageContent/utils/Loader';
import CloseIcon from '@mui/icons-material/Close';
import { putEvent } from 'redux/thunks/Event';

function UserEditEvent({ event }) {
  const { t } = useTranslation('userEvent');

  const { register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [eventName, setEventName] = useState(event.title);
  const [buisnessEmail, setBuisnessEmail] = useState(event.email);
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState(event.phoneNumber);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [eventType, setEventType] = useState(event.ekId);
  const organizerName = event.userName;
  const [locationName, setLocationName] = useState(event.locationName);
  const [locationNameinput, setLocationNameInput] = useState('');
  const [imageId, setImageId] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [endDateErrorMsg, setEndDateErrorMsg] = useState('');

  const date = moment(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-DDTHH:mm');
  const [startDate, setStartDate] = useState(moment(event.startDate).format('yyyy-MM-DDTHH:mm'));
  const endDate = moment(event.endDate).format('yyyy-MM-DDTHH:mm');

  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);
  const { eventTypes, eventTypesLoading } = useSelector((state) => state.eventTypes);

  const isEventImage = event.image === null || event.image === undefined;

  const datasLoading = eventTypesLoading || locationNamesLoading;

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
              overflow: 'hidden',
              bgcolor: 'white',
              boxShadow: 24,
              borderRadius: 7
            }}>
            {datasLoading ? (
              <Loader />
            ) : (
              <div className="flex justify-center flex-col overflow-y-scroll">
                <div className="flex justify-end">
                  <IconButton color="error" onClick={handleClose}>
                    <CloseIcon fontSize="medium" />
                  </IconButton>
                </div>
                <div className="flex justify-center ">
                  <h2>{t('EDIT_EVENT')}</h2>
                </div>
                <div className="flex justify-center">
                  <form
                    className="w-4/5"
                    onSubmit={handleSubmit((data) => {
                      data.id = event.eventId;
                      data.startDate = moment(data.startDate).format('YYYY-MM-DD HH:mm:ss');
                      data.endDate = moment(data.endDate).format('YYYY-MM-DD HH:mm:ss');
                      data.user =
                        organizerName.id === undefined ? event.organizerId : organizerName.id;
                      data.location =
                        locationName.id === undefined ? event.locationId : locationName.id;
                      data.image = imageId;
                      dispatch(putEvent(data, event.id));
                    })}>
                    <fieldset>
                      <div className="flex justify-center pb-9">
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
                      <div className="grid grid-cols-2 gap-10">
                        <TextField
                          helperText={t('ORGANIZER_HELPER')}
                          defaultValue={organizerName}
                          disabled
                          label={t('ORGANIZER')}
                          className="border-2"
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
                                {eventType.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          {...register('phoneNumber')}
                          required
                          autoComplete="on"
                          type="tel"
                          value={buisnessPhoneNum}
                          onChange={buisnessPhoneNumChangeHandler}
                          label={t('BUISNESS_PHONE_NUMBER')}
                          className="border-2"
                        />

                        <TextField
                          {...register('startDate')}
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
                          {...register('endDate')}
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
                        {...register('description')}
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

export default UserEditEvent;
