import { Typography } from '@mui/material';
import BackToButton from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/BackToButton';
import EditEventPictures from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/EditEventPicture';
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
import UserEventTickets from './components/UserEventTickets';

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
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  }, []);

  if (singleDetailedEventLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="justify-start">
        <BackToButton />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col p-6">
          <div className="flex justify-center w-full">
            <EditEventPictures />
          </div>
          <div>
            <div>
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <Typography variant="h5" component="h5">
                    {t('EDIT_EVENT')}:
                  </Typography>
                </div>
                <div className="flex justify-end">
                  <UserEditEvent event={singleDetailedEvent} />
                </div>
              </div>
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('EVENT_TITLE')}: ${singleDetailedEvent.title}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('ORGANIZER')}: ${singleDetailedEvent.userName}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('BUISNESS_EMAIL')}: ${singleDetailedEvent.email}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('BUISNESS_PHONE_NUM')}: ${singleDetailedEvent.phoneNumber}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('EVENT_TYPE')}: ${singleDetailedEvent.name}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('LOCATION')}: ${singleDetailedEvent.postcode} ${
                    singleDetailedEvent.district
                  } ${singleDetailedEvent.street} ${t('STREET')} ${
                    singleDetailedEvent.houseNumber
                  }`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('START_DATE')}: ${singleDetailedEvent.startDate}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('END_DATE')}: ${singleDetailedEvent.endDate}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t('COMISSION')}: ${singleDetailedEvent.comission}%`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${t(`STATUS_${singleDetailedEvent.status}`)}`}
                </Typography>
              </div>
              <SingleEventDescription />
            </div>
            <UserEventTickets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailedEvent;
