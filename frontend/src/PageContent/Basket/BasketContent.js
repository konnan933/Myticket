import { Typography } from '@mui/material';
import moment from 'moment';
import Loader from 'PageContent/utils/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserBasket, getBasketWithDetalis, userPayAmount } from 'redux/thunks/Basket';
import BasketItems from './components/BasketItems';
import BasketTimer from './components/BasketTimer';
import CurrencyPicker from './components/CurrencyPicker';
import EmptyBasket from './components/EmptyBasket';
import PaymentModal from './components/PaymentModal';

function BasketContent() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { basketWithDetails, basketWithDetailsLoading, userPaymentAmount } = useSelector(
    (state) => state.basket
  );

  const lastBookedBasket = Object.values(basketWithDetails).at(-1);
  const isEmptyBasket = Object.keys(basketWithDetails).length === 0;

  const expiredDate = moment(lastBookedBasket).add(30, 'minutes').toISOString() < new Date();
  const [expired, setExpired] = useState(false);
  const [payCurrency, setPayCurrency] = useState('HUF');

  useEffect(() => {
    if (expired) {
      dispatch(deleteUserBasket(loggedUser.id));
      setExpired(false);
    }
    dispatch(getBasketWithDetalis(loggedUser.id));
    dispatch(userPayAmount({ userId: loggedUser.id, currencies: payCurrency }));
  }, [expired]);

  if (expiredDate) {
    dispatch(deleteUserBasket(loggedUser.id));
  }

  if (basketWithDetailsLoading && !isEmptyBasket) {
    return <Loader />;
  }

  if (!basketWithDetailsLoading && isEmptyBasket) {
    return <EmptyBasket />;
  }

  if (!isEmptyBasket) {
    return (
      <div>
        <div className="flex justify-center">
          <BasketTimer setExpired={setExpired} date={lastBookedBasket?.bookedTime} />
        </div>
        <div className="flex justify-center">
          <BasketItems />
        </div>
        <div className="flex justify-evenly w-full max-md:flex-col max-md:items-center mt-4">
          <PaymentModal />
          <CurrencyPicker payCurrency={payCurrency} setPayCurrency={setPayCurrency} />
          <Typography variant="h5">{`${userPaymentAmount} ${payCurrency}`}</Typography>
        </div>
      </div>
    );
  }
}
export default BasketContent;
