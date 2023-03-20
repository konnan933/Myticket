import { Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasket } from 'redux/thunks/Basket';

function BasketTimer({ date }) {
  const expiredDate = moment(date).add(30, 'minutes').toISOString();
  const { t } = useTranslation('basket');
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row">
      <Typography variant="h5" component="div">
        {t('EXPIRE_TIME')}
        {'\xa0'}
      </Typography>
      <div className="text-red-600">
        <Countdown
          date={expiredDate}
          onComplete={() => {
            dispatch(deleteBasket(loggedUser.id)), window.location.reload(true);
          }}
          zeroPadTime={2}
          renderer={(props) => (
            <Typography
              variant="h5"
              component="div">{`${props.minutes}p : ${props.seconds}mp`}</Typography>
          )}
        />
      </div>
    </div>
  );
}

export default BasketTimer;
