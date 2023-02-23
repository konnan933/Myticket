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
  const [startDate, setStartDate] = useState(
    moment(singleEvent.veg_datum).format('yyyy-MM-DDTHH:mm')
  );
  const [allAmount, setAllAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const { ticketTypes } = useSelector((state) => state.ticketTypes);
  const { currencies } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const allAmountChangeHandler = (event) => {
    setAllAmount(event.target.value);
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
        data.esemeny_id = id;
        console.log(data);
        dispatch(addTicket({ data, eventId: id }));
      })}>
      <fieldset>
        <div className="grid gap-8 p-4">
          <FormControl>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('TICKET_TYPE')}
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
            onSelect={(event) => setStartDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
            onChange={startDateChangeHandler}
            helperText={startDateErrorMsg}
            label={t('SALE_START')}
            type="datetime-local"
            className="border-2 px-2 pt-2"
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
export default TicketAddForm;
