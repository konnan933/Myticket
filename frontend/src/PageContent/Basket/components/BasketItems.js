import event from '../../../API/Event';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TicketCounter from './TicketCounter';

function BasketItems() {
  const { t } = useTranslation('basket');
  const { basketWithDetails } = useSelector((state) => state.basket);

  return (
    <div className="w-4/5">
      {basketWithDetails.map((basket) => (
        <div className="p-4" key={basket.id}>
          <Card className="w-2/4 my-7 border-bc-yellow-theme border-2">
            <CardContent>
              <div className="flex flex-row justify-between">
                <img src={`${event.eventPicture}${basket.eventId}`} className="w-1/3" />
                <div>
                  <Typography className="p-2" color="text.primary" variant="h6">{`${t(
                    'EVENT_NAME'
                  )} ${basket.title}`}</Typography>
                  <Typography className="p-2" color="text.primary" variant="h7">{`${t(
                    'EVENT_START_DATE'
                  )} ${basket.startDate}`}</Typography>
                  <TicketCounter basket={basket} />
                  <Typography className="p-2" color="text.primary" variant="h7">{`${t(
                    'EVENT_START_DATE'
                  )} ${basket.startDate}`}</Typography>
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
