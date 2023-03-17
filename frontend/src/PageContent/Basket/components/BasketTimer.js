import { Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';

function BasketTimer({ date }) {
  const expiredDate = moment(date).add(30, 'minutes').toISOString();
  const { t } = useTranslation('basket');
  return (
    <div className="flex flex-row">
      <Typography variant="h5" component="div">
        {t('EXPIRE_TIME')}
        {'\xa0'}
      </Typography>
      <div className="text-red-600">
        <Countdown
          date={expiredDate}
          zeroPadTime={2}
          renderer={(props) => (
            <Typography
              variant="h5"
              component="div">{`${props.minutes}:${props.seconds}`}</Typography>
          )}
        />
      </div>
    </div>
  );
}

export default BasketTimer;
