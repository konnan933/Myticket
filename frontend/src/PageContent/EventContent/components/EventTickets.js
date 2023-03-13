import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TicketCounterButton from './TicketCounterButton';

function EventTickets() {
  const { t } = useTranslation('eventPage');
  const { eventTickets } = useSelector((state) => state.ticket);

  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 place-items-center">
      {eventTickets.map((ticket) => {
        return (
          <Card className="w-4/5 my-7 border-bc-yellow-theme border-2" key={ticket.conceptTicketId}>
            <CardActionArea>
              <CardContent>
                <Typography color="text.primary" variant="h4">{`${ticket.name}`}</Typography>
                <div className="border-b-2 border-bc-gray-theme w-full my-4" />
                <Typography variant="h6" color="text.primary">{`${t('REMAINING_TICKET')}: ${
                  ticket.freeTicket
                } ${t('NUMBER_OF_TICKETS')}`}</Typography>
                <Typography variant="h6" color="text.primary">{`${t('PRICE')}: ${
                  ticket.currencies === 'HUF'
                    ? Math.round(ticket.price)
                    : Math.round(ticket.price * 100) / 100
                } ${ticket.currencies}`}</Typography>
                <Typography variant="h6" color="text.primary">{`${t('TICKET_STARTS')}: ${
                  ticket.startDate
                }`}</Typography>
                <div className="border-b-2 border-bc-gray-theme w-full my-4" />
                <TicketCounterButton conceptTicketId={ticket.conceptTicketId} />
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default EventTickets;
