import { Typography } from '@mui/material';
import SingleEventDescription from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/SingleEventDescription';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, getSingleEventsDetailed } from 'redux/thunks/Event';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import { getEventTickets } from 'redux/thunks/Ticket';
import UserEditEvent from './components/UserEditEvent';

function UserDetailedEvent() {
  const { t } = useTranslation('userEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleDetailedEvent, singleDetailedEventLoading } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getSingleEventsDetailed(id));
    dispatch(getSingleEvent(id));
    dispatch(getEventTickets(id));
    dispatch(getEventTypes());
    dispatch(getLocationNames());
  }, []);

  if (singleDetailedEventLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-2/3">
        <Typography>{t('EDIT_EVENT')}:</Typography>
        <UserEditEvent event={singleDetailedEvent} />
      </div>
      <div className="flex ">
        <Typography>{t('EVENTNAME')}</Typography>
        <Typography>{`: ${singleDetailedEvent.title}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('ORGANIZER')}</Typography>
        <Typography>{`: ${singleDetailedEvent.userName}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('BUISNESS_EMAIL')}</Typography>
        <Typography>{`: ${singleDetailedEvent.email}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('BUISNESS_PHON_NUM')}</Typography>
        <Typography>{`: ${singleDetailedEvent.phoneNumber}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('EVENT_TYPE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.name}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('LOCATION')}</Typography>
        <Typography>{`: ${singleDetailedEvent.postcode} ${singleDetailedEvent.district} ${
          singleDetailedEvent.street
        } ${t('STREET')} ${singleDetailedEvent.houseNumber}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('START_DATE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.startDate}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('END_DATE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.endDate}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('COMISSION')}</Typography>
        <Typography>{`: ${singleDetailedEvent.comission}%`}</Typography>
      </div>
      <div className="flex ">
        <SingleEventDescription />
      </div>
      <div className="flex ">
        <Typography>{t(`STATUS`)}</Typography>
        <Typography>{`: ${t(`STATUS_${singleDetailedEvent.status}`)}`}</Typography>
      </div>
    </div>
  );
}

export default UserDetailedEvent;
