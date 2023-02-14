import { Box, Button, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import bigModalStyle from 'PageContent/utils/BigModalStyle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { addEvent, getEventTypes } from 'redux/thunks/Admin';

function AddEvent({ eventTypes }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [buisnessEmail, setBuisnessEmail] = useState('');
  const [buisnessPhoneNum, setBuisnessPhoneNum] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPostcode, setEventPostcode] = useState('');
  const [eventDisctrict, setEventEventDisctrict] = useState('');
  const [eventStreet, setEventStreet] = useState('');
  const [eventRoom, setEventRoom] = useState('');
  const [eventStreetNumber, setEventStreetNumber] = useState('');
  const [eventType, setEventType] = useState('');

  const date = moment(new Date()).format('YYYY-MM-DDTkk:mm');

  useEffect(() => {
    dispatch(getEventTypes());
  }, []);

  const eventNameChangeHandler = (event) => {
    setEventName(event.target.value);
  };

  const organizerNameChangeHandler = (event) => {
    setOrganizerName(event.target.value);
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

  const eventPostcodeChangeHandler = (event) => {
    setEventPostcode(event.target.value);
  };

  const eventDisctrictChangeHandler = (event) => {
    setEventEventDisctrict(event.target.value);
  };

  const eventStreetChangeHandler = (event) => {
    setEventStreet(event.target.value);
  };

  const eventRoomChangeHandler = (event) => {
    setEventRoom(event.target.value);
  };

  const eventStreetNumberChangeHandler = (event) => {
    setEventStreetNumber(event.target.value);
  };

  const eventTypeChangeHandler = (event) => {
    setEventType(event.target.value);
  };

  return (
    <div className="flex justify-start pl-72">
      <div className="pt-8">
        <Button onClick={handleOpen} variant="outlined" endIcon={<AddIcon />}>
          {t('ADD_EVENT')}
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={bigModalStyle}>
            <div className="flex justify-center">
              <h2>{t('ADD_EVENT')}</h2>
            </div>
            <form
              onSubmit={handleSubmit((data) => {
                data.kezd_datum = moment(data.kezd_datum).format('YYYY-MM-DD hh:mm:ss');
                data.veg_datum = moment(data.veg_datum).format('YYYY-MM-DD hh:mm:ss');
                console.log(data);
                dispatch(addEvent(data));
              })}>
              <fieldset>
                <div className="grid grid-cols-3 gap-12">
                  <TextField
                    {...register('cim')}
                    required
                    type="text"
                    value={eventName}
                    onChange={eventNameChangeHandler}
                    label={t('EVENT_NAME')}
                    className="border-2"
                  />

                  <Select
                    {...register('megnev')}
                    value={eventType}
                    onChange={eventTypeChangeHandler}
                    inputProps={{ 'aria-label': 'Without label' }}>
                    {eventTypes.map((eventType) => (
                      <MenuItem key={eventType.id} value={eventType.id}>
                        {eventType.megnev}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                    {...register('fel_nev')}
                    required
                    type="text"
                    value={organizerName}
                    onChange={organizerNameChangeHandler}
                    label={t('ORGANIZER')}
                    className="border-2"
                  />

                  <TextField
                    {...register('buisness_email')}
                    required
                    type="email"
                    value={buisnessEmail}
                    onChange={buisnessEmailChangeHandler}
                    label={t('BUISNESS_EMAIL')}
                    className="border-2"
                  />

                  <TextField
                    {...register('buisness_tel')}
                    required
                    type="tel"
                    value={buisnessPhoneNum}
                    onChange={buisnessPhoneNumChangeHandler}
                    label={t('BUISNESS_PHONE_NUMBER')}
                    className="border-2"
                  />

                  <TextField
                    {...register('iranyitoszam')}
                    required
                    type="number"
                    value={eventPostcode}
                    onChange={eventPostcodeChangeHandler}
                    label={t('POSTCODE')}
                    className="border-2"
                  />

                  <TextField
                    {...register('kerulet')}
                    type="number"
                    value={eventDisctrict}
                    onChange={eventDisctrictChangeHandler}
                    label={t('DISCTRICT')}
                    className="border-2"
                  />

                  <TextField
                    {...register('utca')}
                    required
                    type="text"
                    value={eventStreet}
                    onChange={eventStreetChangeHandler}
                    label={t('STREET')}
                    className="border-2"
                  />

                  <TextField
                    {...register('hazszam')}
                    required
                    type="number"
                    value={eventStreetNumber}
                    onChange={eventStreetNumberChangeHandler}
                    label={t('STREET_NUMBER')}
                    className="border-2"
                  />

                  <TextField
                    {...register('terem')}
                    required
                    type="text"
                    value={eventRoom}
                    onChange={eventRoomChangeHandler}
                    label={t('ROOM')}
                    className="border-2"
                  />

                  <TextField
                    {...register('kezd_datum')}
                    required
                    defaultValue={date}
                    label="asd"
                    type="datetime-local"
                    className="border-2 px-2 pt-2"
                  />

                  <TextField
                    {...register('veg_datum')}
                    required
                    defaultValue={date}
                    label="asd"
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
              </fieldset>
              <div className="flex justify-center pt-6">
                <Button
                  variant="contained"
                  color="info"
                  className=" w-28"
                  aria-label="Sign in"
                  type="submit"
                  size="lagre">
                  {t('LOGIN_SEND')}
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddEvent;
