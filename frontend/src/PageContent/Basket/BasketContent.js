import moment from 'moment';
import Loader from 'PageContent/utils/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserBasket, getBasketWithDetalis } from 'redux/thunks/Basket';
import BasketItems from './components/BasketItems';
import BasketTimer from './components/BasketTimer';
import EmptyBasket from './components/EmptyBasket';
import PaymentModal from './components/PaymentModal';

function BasketContent() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { basketWithDetails, basketWithDetailsLoading } = useSelector((state) => state.basket);
  const lastBookedBasket = Object.values(basketWithDetails).at(-1);
  const expiredDate = moment(lastBookedBasket).add(30, 'minutes').toISOString() < new Date();
  const isEmptyBasket = Object.keys(basketWithDetails).length === 0;
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expired) {
      dispatch(deleteUserBasket(loggedUser.id));
      setExpired(false);
    }
    dispatch(getBasketWithDetalis(loggedUser.id));
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
        <BasketItems />
        <PaymentModal />
      </div>
    );
  }
}
export default BasketContent;
