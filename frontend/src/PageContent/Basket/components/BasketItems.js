import event from '../../../API/Event';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TicketCounter from './TicketCounter';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BasketItems() {
  const { t } = useTranslation('basket');
  const { basketWithDetails } = useSelector((state) => state.basket);

  return (
    <div>
      {basketWithDetails.map((basket) => (
        <Card key={basket.id} className="my-7 border-bc-yellow-theme border-2">
          <CardContent>
            <div className="flex flex-row justify-between">
              <div>
                <LazyLoadImage
                  alt="Esemeny kep"
                  src={`${event.eventPicture}${basket.eventId}`}
                  effect="blur"
                  width={'60%'}
                />
              </div>
              <div>
                <Typography className="p-2" color="text.primary" variant="h6">{`${t(
                  'EVENT_NAME'
                )} ${basket.title}`}</Typography>
                <Typography className="p-2" color="text.primary" variant="h7">{`${t(
                  'EVENT_START_DATE'
                )} ${basket.startDate}`}</Typography>
                <TicketCounter basket={basket} />
                <Typography className="p-2" color="text.primary" variant="h7">{`${t('CURRENCY')} ${
                  basket.currencies
                }`}</Typography>
                <Typography className="p-2" color="text.primary" variant="h7">{`${t(
                  'TICKET_TYPE'
                )} ${basket.ticketType}`}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BasketItems;
