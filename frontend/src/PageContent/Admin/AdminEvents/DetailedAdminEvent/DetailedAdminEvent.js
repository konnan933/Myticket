import { Typography } from '@mui/material';
//import admin from 'API/Admin';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEventsDetailed, getUserNames } from 'redux/thunks/Admin';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import { getEventTickets } from 'redux/thunks/Ticket';
import BackToButton from './components/BackToButton';
import DetailedData from './components/DetailedData';
import EditEventPictures from './components/EditEventPicture';
import SingleEventTickets from './SingleEventTickets';

function DetailedAdminEvent() {
  const { t } = useTranslation('adminEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleDetailedEvent, singleDetailedEventLoading } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getSingleEventsDetailed(id));
    dispatch(getEventTickets(id));
    dispatch(getEventTypes());
    dispatch(getUserNames());
    dispatch(getLocationNames());
  }, []);

  if (singleDetailedEventLoading) {
    return <Loader />;
  }
  console.log(singleDetailedEvent);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-3/4">
        <div>
          <BackToButton />
        </div>
        <div className="flex flex-col">
          <div>
            <Typography variant="h4">{`${singleDetailedEvent.cim} ${t('EVENTNAME')}`}</Typography>
          </div>
          <div className="flex justify-between">
            <EditEventPictures />
            <DetailedData />
          </div>
          <SingleEventTickets />
        </div>
      </div>
    </div>
  );
}
export default DetailedAdminEvent;
