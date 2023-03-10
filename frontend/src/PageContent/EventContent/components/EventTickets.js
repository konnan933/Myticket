import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function EventTickets() {
  const { t } = useTranslation('eventPage');
  const { eventTickets } = useSelector((state) => state.ticket);

  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 place-items-center">
      {eventTickets.map((ticket) => {
        return (
          <Card className="w-4/5 my-7" key={ticket.conceptTicketId}>
            <CardActionArea>
              <CardContent>
                <Typography color="text.primary">{`${t('REMAINING_TICKET')}: ${
                  ticket.freeTicket
                } ${t('NUMBER_OF_TICKETS')}`}</Typography>
                <Typography color="text.primary">{`${t('PRICE')}: ${Math.round(ticket.price)} ${
                  ticket.currencies
                }`}</Typography>
                <Typography color="text.primary">{`${t('TICKET_STARTS')}: ${
                  ticket.startDate
                }`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default EventTickets;
