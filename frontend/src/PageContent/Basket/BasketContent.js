import moment from 'moment';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasket, getBasketWithDetalis } from 'redux/thunks/Basket';
import BasketItems from './components/BasketItems';
import BasketTimer from './components/BasketTimer';
import EmptyBasket from './components/EmptyBasket';
import PaymentModal from './components/PaymentModal';

function BasketContent() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { basketWithDetails, basketWithDetailsLoading } = useSelector((state) => state.basket);
  const lastBookedDate = Object.values(basketWithDetails).at(-1);
  const isEmptyBasket = Object.keys(basketWithDetails).length === 0;
  const expiredDate = moment(lastBookedDate).add(30, 'minutes').toISOString();
  if (expiredDate <= new Date()) {
    dispatch(deleteBasket(loggedUser.id));
    return <Loader />;
  }

  useEffect(() => {
    dispatch(getBasketWithDetalis(loggedUser.id));
  }, []);

  if (basketWithDetailsLoading && lastBookedDate?.bookedTime === undefined && !isEmptyBasket) {
    return <Loader />;
  }

  if (!basketWithDetailsLoading && isEmptyBasket) {
    return <EmptyBasket />;
  }

  if (!isEmptyBasket) {
    return (
      <div>
        <div className="flex justify-center">
          <BasketTimer date={lastBookedDate?.bookedTime} />
        </div>
        <BasketItems />
        <PaymentModal />
      </div>
    );
  }
}
export default BasketContent;
