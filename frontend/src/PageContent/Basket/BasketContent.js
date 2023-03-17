import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBasket } from 'redux/thunks/Basket';
import BasketTimer from './components/BasketTimer';

function BasketContent() {
  const { t } = useTranslation('basket');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { basket, basketLoading } = useSelector((state) => state.basket);
  const lastBookedDate = Object.values(basket).at(-1);
  const isEmptyBasket = Object.keys(basket).length === 0;
  useEffect(() => {
    dispatch(getBasket(loggedUser.id));
  }, []);

  if (basketLoading && lastBookedDate?.bookedTime === undefined) {
    return <Loader />;
  }

  if (isEmptyBasket) {
    return <div>nincs</div>;
  }

  return (
    <div className="flex justify-center">
      <div>
        <BasketTimer date={lastBookedDate?.bookedTime} />
      </div>
    </div>
  );
}
export default BasketContent;
