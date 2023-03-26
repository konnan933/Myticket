import { Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';

function BasketTimer({ date, setExpired }) {
  const expiredDate = moment(date).add(30, 'minutes').toISOString();
  const { t } = useTranslation('basket');
  return (
    <div className="flex flex-row max-md:flex-col justify-center items-center my-5">
      <Typography variant="h5" component="div" align="center">
        {t('EXPIRE_TIME')}
      </Typography>
      <div className="text-red-600">
        <Countdown
          date={expiredDate}
          onComplete={() => {
            setExpired(true);
          }}
          renderer={(props) => (
            <Typography variant="h5" component="div">{`${props.minutes}${t('MINUTE')} : ${
              props.seconds
            }${t('SECOND')}`}</Typography>
          )}
        />
      </div>
    </div>
  );
}

export default BasketTimer;
