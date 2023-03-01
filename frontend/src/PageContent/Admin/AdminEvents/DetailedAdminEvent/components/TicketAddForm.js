import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useParams } from 'react-router-dom';
import { addTicket } from 'redux/thunks/Ticket';
import moment from 'moment';

function TicketAddForm() {
  const { t } = useTranslation('adminEvent');
  const { singleEvent } = useSelector((state) => state.admin);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [ticketType, setTicketType] = useState('');
  const [currency, setCurrency] = useState('');
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const startDate = moment(singleEvent.endDate).format('yyyy-MM-DDTHH:mm');
  const [allAmount, setAllAmount] = useState(0);
  const [allAmountError, setAllAmountError] = useState(false);
  const [allAmountErrorMsg, setAllAmountErrorMsg] = useState('');
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(false);
  const [priceErrorMsg, setPriceErrorMsg] = useState('');
  const { ticketTypes } = useSelector((state) => state.ticketTypes);
  const { currencies } = useSelector((state) => state.currencies);
  const dispatch = useDispatch();

  const errors = startDateError || allAmountError || priceError;

  const allAmountChangeHandler = (event) => {
    setAllAmount(event.target.value);
    if (event.target.value <= 0 && !(event.target.value === '')) {
      setAllAmountError(true);
      setAllAmountErrorMsg(t('ALL_AMOUNT_LOWER'));
    } else {
      setAllAmountError(false);
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
    if (event.target.value < 0) {
      setPriceError(true);
      setPriceErrorMsg(t('PRICE_LOWER'));
    } else {
      setPriceError(false);
      setPriceErrorMsg('');
    }
  };

  const startDateChangeHandler = (event) => {
    if (event.target.value >= startDate) {
      setStartDateError(true);
      setStartDateErrorMsg(t('SALE_DATE_LOWER'));
    } else {
      setStartDateError(false);
      setStartDateErrorMsg('');
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.eventId = id;
        dispatch(addTicket({ data, eventId: id }));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <FormControl>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('TICKET_TYPE')}
            </InputLabel>
            <Select
              {...register('type')}
              value={ticketType}
              notched={true}
              required
              label={t('TICKET_TYPE')}
              onChange={ticketTypeChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              {ticketTypes.map((ticketTypes) => (
                <MenuItem key={ticketTypes.id} value={ticketTypes.id}>
                  {ticketTypes.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            {...register('allTicket')}
            required
            error={allAmountError}
            helperText={allAmountErrorMsg}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            value={allAmount}
            onChange={allAmountChangeHandler}
            label={t('PORTION')}
            className="border-2"
          />
          <FormControl>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('CURRENCY')}
            </InputLabel>
            <Select
              {...register('name')}
              value={currency}
              notched={true}
              required
              label={t('CURRENCY')}
              onChange={currencyChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              {currencies.map((currencies) => (
                <MenuItem key={currencies.name} value={currencies.name}>
                  {currencies.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            {...register('price')}
            required
            error={priceError}
            helperText={priceErrorMsg}
            type="number"
            value={price}
            onChange={priceChangeHandler}
            label={t('PRICE')}
            className="border-2"
          />

          <TextField
            {...register('startDate')}
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
            disabled={errors}
            variant="contained"
            color="info"
            className=" w-full mt-16"
            aria-label="Add ticket"
            type="submit"
            size="large">
            {t('SEND')}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
export default TicketAddForm;
