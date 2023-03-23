import event from '../../../API/Event';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TicketCounter from './TicketCounter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteBasketButton from './DeleteBasketButton';

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
                  width={'200'}
                />
              </div>
              <div>
                <Typography
                  className="p-2"
                  color="text.primary"
                  variant="h6">{`${basket.title}`}</Typography>
                <Typography className="p-2" color="text.primary" variant="h7">{`${t(
                  'EVENT_START_DATE'
                )} ${basket.startDate}`}</Typography>
                <TicketCounter basket={basket} />
                <Typography
                  className="p-2"
                  color="text.primary"
                  variant="h7">{`${basket.currencies}`}</Typography>
                <Typography
                  className="p-2"
                  color="text.primary"
                  variant="h7">{`${basket.ticketType}`}</Typography>
              </div>
              <div className="flex justify-center items-center">
                <DeleteBasketButton basket={basket} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BasketItems;
