import { Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserNames } from 'redux/thunks/Admin';
import { getSingleEvent, getSingleEventsDetailed } from 'redux/thunks/Event';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import { getEventTickets } from 'redux/thunks/Ticket';
import AdminEventActions from './components/AdminEventActions';
import BackToButton from './components/BackToButton';
import DetailedData from './components/DetailedData';
import EditEventPictures from './components/EditEventPicture';
import SingleEventTickets from './SingleEventTickets';

function DetailedAdminEvent() {
  const { t } = useTranslation('adminEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleDetailedEvent, singleDetailedEventLoading } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getSingleEventsDetailed(id));
    dispatch(getSingleEvent(id));
    dispatch(getEventTickets(id));
    dispatch(getEventTypes());
    dispatch(getUserNames());
    dispatch(getLocationNames());
  }, []);

  if (singleDetailedEventLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-3/4">
        <div>
          <BackToButton />
        </div>
        <div className="flex flex-col">
          <div>
            <Typography variant="h4">{`${singleDetailedEvent.title} ${t('EVENTNAME')}`}</Typography>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <EditEventPictures />
              <DetailedData />
            </div>
            <AdminEventActions />
          </div>
          <SingleEventTickets />
        </div>
      </div>
    </div>
  );
}
export default DetailedAdminEvent;
