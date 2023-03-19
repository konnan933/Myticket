import moment from 'moment';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasket, getBasketWithDetalis } from 'redux/thunks/Basket';
import BasketTimer from './components/BasketTimer';
import EmptyBasket from './components/EmptyBasket';
import { Card, CardContent, Typography } from '@mui/material';
import PaymentModal from './components/PaymentModal';

function BasketContent() {
  const { t } = useTranslation('basket');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);
  const { basketWithDetails, basketWithDetailsLoading } = useSelector((state) => state.basket);
  const lastBookedDate = Object.values(basketWithDetails).at(-1);
  const isEmptyBasket = Object.keys(basketWithDetails).length === 0;
  const expiredDate = moment(lastBookedDate).add(30, 'minutes').toISOString();

  if (expiredDate <= new Date()) {
    dispatch(deleteBasket(loggedUser.id));
  }
  console.log(basketWithDetails);

  useEffect(() => {
    dispatch(getBasketWithDetalis(loggedUser.id));
  }, []);

  if (basketWithDetailsLoading && lastBookedDate?.bookedTime === undefined && !isEmptyBasket) {
    return <Loader />;
  }

  if (!basketWithDetailsLoading && isEmptyBasket) {
    return <EmptyBasket />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <BasketTimer date={lastBookedDate?.bookedTime} />
      </div>
      <div>
        {basketWithDetails.map((basket) => (
          <div key={basket.id}>
            <Card className="w-2/3 my-7 border-bc-yellow-theme border-2">
              <CardContent>
                <Typography color="text.primary" variant="h5">{`${basket.title}`}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <PaymentModal />
    </div>
  );
}
export default BasketContent;
