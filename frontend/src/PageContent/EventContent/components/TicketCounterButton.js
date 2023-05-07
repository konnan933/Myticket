import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { basketCounter } from 'redux/slices/BasketSlice';
import { postBasket } from 'redux/thunks/Basket';

function TicketCounterButton({ ticket }) {
  const { t } = useTranslation('eventPage');
  const navigation = useNavigate();

  const { loggedUser, loggedIn } = useSelector((state) => state.auth);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const createSelectItems = () => {
    const localArray = [];
    const maxNumberOfTicketsPicked = ticket.freeTicket < 20 ? ticket.freeTicket : 20;
    for (let index = 0; index <= maxNumberOfTicketsPicked; index++) {
      localArray.push(
        <MenuItem key={index} value={index}>
          {index}
        </MenuItem>
      );
    }
    return localArray;
  };

  const handlePutInbasket = () => {
    if (loggedIn) {
      const localBasketItem = {
        eventId: Number(id),
        conceptTicketId: ticket.conceptTicketId,
        user: loggedUser.id,
        numberOfTickets: counter
      };
      dispatch(basketCounter(counter));
      dispatch(postBasket(localBasketItem));
    } else {
      navigation('/login');
    }
  };
  return (
    <div className={`flex w-full ${loggedIn ? 'justify-between' : 'justify-center'}`}>
      {loggedIn ? (
        <Button
          onClick={handlePutInbasket}
          disabled={counter === 0}
          variant="contained"
          color="info"
          className=" w-48"
          aria-label="Event add"
          type="submit"
          size="lagre">
          {t('INTO_BASKET')}
        </Button>
      ) : (
        <Button
          onClick={handlePutInbasket}
          variant="contained"
          color="info"
          className=" w-9/10"
          aria-label="Event add"
          type="submit"
          size="lagre">
          {t('MUST_LOGIN')}
        </Button>
      )}
      {loggedIn && (
        <div className="flex justify-end w-full">
          <FormControl className="w-48/100">
            <InputLabel shrink={true}>{t('NUMBER_OF_TICKETS')}</InputLabel>
            <Select
              value={counter}
              notched={true}
              label={t('NUMBER_OF_TICKETS')}
              defaultValue={counter}
              onChange={(event) => {
                setCounter(event.target.value);
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
              {createSelectItems()}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
export default TicketCounterButton;
