import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { putBasket, userPayAmount } from 'redux/thunks/Basket';

function TicketCounter({ basket, payCurrency }) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { t } = useTranslation('basket');
  const [counter, setCounter] = useState(basket.numberOfTickets);

  const createSelectItems = () => {
    const localArray = [];
    for (let index = 1; index <= 20; index++) {
      localArray.push(
        <MenuItem key={index} value={index}>
          {index}
        </MenuItem>
      );
    }
    return localArray;
  };
  const handlePutInbasket = (amount) => {
    const localBasketItem = {
      payed: 0,
      eventId: basket.eventId,
      conceptTicketId: basket.conceptTicketId,
      user: loggedUser.id,
      numberOfTickets: amount
    };
    dispatch(putBasket({ id: basket.id, data: localBasketItem })).then(() => {
      dispatch(userPayAmount({ userId: loggedUser.id, currencies: payCurrency }));
    });
  };
  return (
    <div className="p-2">
      <FormControl className="w-full">
        <InputLabel shrink={true}>{t('NUMBER_OF_TICKETS')}</InputLabel>
        <Select
          value={counter}
          notched={true}
          label={t('NUMBER_OF_TICKETS')}
          defaultValue={counter}
          onChange={(event) => {
            setCounter(event.target.value);
            handlePutInbasket(event.target.value);
          }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
          {createSelectItems()}
        </Select>
      </FormControl>
    </div>
  );
}
export default TicketCounter;
