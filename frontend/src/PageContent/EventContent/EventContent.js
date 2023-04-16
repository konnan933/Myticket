import { Typography, useMediaQuery } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEventsDetailed } from 'redux/thunks/Event';
import { getEventTickets } from 'redux/thunks/Ticket';
import EventPicture from './components/EventPicture';
import EventTickets from './components/EventTickets';

function EventContent() {
  const { t } = useTranslation('eventPage');
  const { id } = useParams();
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:768px)');

  const { singleDetailedEvent, singleDetailedEventLoading } = useSelector((state) => state.event);
  const { eventTicketsLoading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getSingleEventsDetailed(id));
    dispatch(getEventTickets(id));
  }, []);

  if (singleDetailedEventLoading || eventTicketsLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto">
      <EventPicture />
      <div className="w-full my-10">
        <Typography className="pl-4" variant={matches ? 'h3' : 'h4'}>{`${
          singleDetailedEvent.title
        } ${t('TICKETS')}`}</Typography>
      </div>
      <EventTickets />
    </div>
  );
}

export default EventContent;
