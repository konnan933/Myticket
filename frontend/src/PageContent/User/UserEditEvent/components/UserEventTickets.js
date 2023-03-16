import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Loader from 'PageContent/utils/Loader';
import { Box } from '@mui/system';
import { CardActions, useMediaQuery } from '@mui/material';
import 'react-lazy-load-image-component/src/effects/blur.css';
import DeleteTicket from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/DeleteTicket';
import EditTicket from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/EditTicket';
import UserAddTicket from './UserAddTicket';

function UserEventTickets() {
  const width = useMediaQuery('(max-width:768px)');
  const { eventTickets, eventTicketsLoading } = useSelector((state) => state.ticket);
  const { t } = useTranslation('userEvent');

  if (eventTicketsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <UserAddTicket />;
      </div>
      <div className={`grid ${width ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {eventTickets.map((ticket) => (
          <div className="p-7" key={ticket.conceptTicketId}>
            <Card>
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ticket.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('ALL_TICKET')}: ${ticket.allTicket} ${t('PORTION')}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('BOOKED_TCIKET')}: ${ticket.bookedTicket} ${t('PORTION')}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${t('FREE_TICKET')}: ${ticket.freeTicket} ${t('PORTION')}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="flex justify-between w-full">
                    <DeleteTicket ticketId={ticket.conceptTicketId} />
                    <EditTicket ticket={ticket} />
                  </div>
                </CardActions>
              </Box>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserEventTickets;
