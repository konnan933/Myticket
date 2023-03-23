import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { putBasket } from 'redux/thunks/Basket';

function TicketCounter({ basket }) {
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
  const handlePutInbasket = () => {
    const localBasketItem = {
      payed: 0,
      eventId: basket.eventId,
      conceptTicketId: basket.conceptTicketId,
      user: loggedUser.id,
      numberOfTickets: counter
    };
    dispatch(putBasket({ id: basket.id, data: localBasketItem }));
  };
  return (
    <div className="p-2">
      <FormControl className="w-1/2">
        <InputLabel shrink={true}>{t('NUMBER_OF_TICKETS')}</InputLabel>
        <Select
          value={counter}
          notched={true}
          label={t('NUMBER_OF_TICKETS')}
          defaultValue={counter}
          onChange={(event) => {
            setCounter(event.target.value);
          }}
          onSelect={handlePutInbasket}
          MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
          {createSelectItems()}
        </Select>
      </FormControl>
    </div>
  );
}
export default TicketCounter;
