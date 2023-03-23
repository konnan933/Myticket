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
        <div style={{ width: 600 }} className="p-4" key={basket.id}>
          <Card style={{ minWidth: 300 }} className="border-bc-yellow-theme border-2">
            <CardContent>
              <div className="flex flex-row justify-evenly items-center">
                <div style={{ minWidth: 160 }} className="flex justify-center items-center">
                  <LazyLoadImage
                    alt="Esemeny kep"
                    src={`${event.eventPicture}${basket.eventId}`}
                    effect="blur"
                    width={'160'}
                  />
                </div>
                <div className="w-1/3">
                  <Typography color="text.primary">{`${basket.title}`}</Typography>
                  <Typography color="text.primary">{`${t('EVENT_START_DATE')} ${
                    basket.startDate
                  }`}</Typography>
                  <div className="flex flex-row">
                    <Typography color="text.primary">{`${basket.price} ${basket.currencies}`}</Typography>
                    <Typography color="text.primary">{`${basket.ticketType}`}</Typography>
                  </div>
                </div>
                <div className="flex-row">
                  <DeleteBasketButton basket={basket} />
                  <TicketCounter basket={basket} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default BasketItems;
