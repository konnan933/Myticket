import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postBasket } from 'redux/thunks/Basket';

function TicketCounterButton({ conceptTicketId }) {
  const { t } = useTranslation('eventPage');

  const { loggedUser } = useSelector((state) => state.auth);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const createSelectItems = () => {
    const localArray = [];
    for (let index = 0; index < 20; index++) {
      localArray.push(
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      );
    }
    return localArray;
  };

  const handlePutInbasket = () => {
    const localBasketItem = {
      eventId: Number(id),
      conceptTicketId,
      user: loggedUser.id,
      numberOfTickets: counter
    };
    dispatch(postBasket(localBasketItem));
  };
  return (
    <div className="flex w-full justify-between">
      <Button onClick={handlePutInbasket} disabled={counter === 0}>
        {t('INTO_BASKET')}
      </Button>
      <div className="flex justify-end w-full">
        <FormControl className="w-1/3">
          <InputLabel shrink={true}>{t('NUMBER_OF_TICKETS')}</InputLabel>
          <Select
            value={counter}
            notched={true}
            label={t('NUMBER_OF_TICKETS')}
            defaultValue={counter}
            onChange={(event) => {
              console.log(event.target.value);
              setCounter(event.target.value);
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
            {createSelectItems()}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
export default TicketCounterButton;
