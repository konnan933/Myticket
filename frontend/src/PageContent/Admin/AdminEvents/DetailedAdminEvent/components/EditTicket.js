import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { putEventTicket } from 'redux/thunks/Ticket';

function EditTicket({ ticket }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminEvent');
  const { singleEvent } = useSelector((state) => state.admin);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [ticketType, setTicketType] = useState(ticket.tipus);
  const [currency, setCurrency] = useState(ticket.penznem);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [allAmountErrorMsg, setAllAmountErrorMsg] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [allAmountError, setAllamountError] = useState(false);
  const startDate = moment(singleEvent.veg_datum).format('yyyy-MM-DDTHH:mm');
  const date = moment(new Date()).format('yyyy-MM-DDTHH:mm');
  const [allAmount, setAllAmount] = useState(ticket.szabad_menny);
  const [price, setPrice] = useState(ticket.ara);
  const { ticketTypes } = useSelector((state) => state.ticketTypes);
  const { currencies } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const errors = allAmountError || startDateError;

  const allAmountChangeHandler = (event) => {
    setAllAmount(event.target.value);
    if (event.target.value <= ticket.lefog_menny) {
      setAllamountError(true);
      setAllAmountErrorMsg(t('TICKET_AMOUNT_LOWER') + ` (${ticket.lefog_menny})`);
    } else {
      setAllamountError(false);
      setAllAmountErrorMsg('');
    }
  };
  const ticketTypeChangeHandler = (event) => {
    setTicketType(event.target.value);
  };
  const currencyChangeHandler = (event) => {
    setCurrency(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const startDateChangeHandler = (event) => {
    if (event.target.value > startDate) {
      setStartDateError(true);
      setStartDateErrorMsg(t('SALE_DATE_LOWER'));
    } else if (event.target.value <= date) {
      setStartDateError(true);
      setStartDateErrorMsg(t('SALE_DATE_LOWER_TODAY'));
    } else {
      setStartDateError(false);
      setStartDateErrorMsg('');
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
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: 7
            }}>
            <div className="flex justify-center flex-col">
              <div className="flex justify-center p-10">
                <h2>{t('EDIT_TICKET')}</h2>
              </div>
              <div className="flex justify-center">
                <form
                  onSubmit={handleSubmit((data) => {
                    data.esemeny_id = id;
                    data.eszmei_jegy_id = ticket.eszmei_jegy_id;
                    console.log(data);
                    dispatch(
                      putEventTicket({ data, ticketId: ticket.eszmei_jegy_id, eventId: id })
                    );
                  })}>
                  <fieldset>
                    <div className="grid gap-8 p-4">
                      <FormControl>
                        <InputLabel shrink={true} id="demo-simple-select-label">
                          {t('EDIT_TICKET_TYPE')}
                        </InputLabel>
                        <Select
                          {...register('tipus')}
                          value={ticketType}
                          notched={true}
                          required
                          label={t('TICKET_TYPE')}
                          onChange={ticketTypeChangeHandler}
                          inputProps={{ 'aria-label': 'Without label' }}>
                          {ticketTypes.map((ticketType) => (
                            <MenuItem key={ticketType.id} value={ticketType.id}>
                              {ticketType.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        {...register('ossz_menny')}
                        required
                        type="number"
                        error={allAmountError}
                        helperText={allAmountErrorMsg}
                        value={allAmount}
                        onChange={allAmountChangeHandler}
                        label={t('ALL_TICKET_AMOUNT')}
                        className="border-2"
                      />

                      <FormControl>
                        <InputLabel shrink={true} id="demo-simple-select-label">
                          {t('CURRENCY')}
                        </InputLabel>
                        <Select
                          {...register('penznem')}
                          value={currency}
                          notched={true}
                          required
                          label={t('CURRENCY')}
                          onChange={currencyChangeHandler}
                          inputProps={{ 'aria-label': 'Without label' }}>
                          {currencies.map((currency) => (
                            <MenuItem key={currency.penznem} value={currency.penznem}>
                              {currency.penznem}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        {...register('ara')}
                        required
                        type="number"
                        value={price}
                        onChange={priceChangeHandler}
                        label={t('PRICE')}
                        className="border-2"
                      />

                      <TextField
                        {...register('kezd_datum')}
                        error={startDateError}
                        defaultValue={startDate}
                        onSelect={startDateChangeHandler}
                        InputLabelProps={{ shrink: true }}
                        helperText={startDateErrorMsg}
                        label={t('SALE_START')}
                        type="datetime-local"
                        className="border-2 px-2 pt-2"
                      />

                      <Button
                        variant="contained"
                        disabled={errors}
                        color="info"
                        className=" w-full mt-16"
                        aria-label="Edit ticket"
                        type="submit"
                        size="large">
                        {t('SEND')}
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditTicket;
