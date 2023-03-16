import { Typography, useMediaQuery } from '@mui/material';
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
import EditEventEndDate from './components/EditEventEndDate';
import EditEventLocation from './components/EditEventLocation';
import EditEventOneData from './components/EditEventOneData';
import EditEventStartDate from './components/EditEventStartDate';
import EditEventType from './components/EditEventType';
import UserEditEvent from './components/UserEditEvent';
import UserEventTickets from './components/UserEventTickets';

function UserDetailedEvent() {
  const { t } = useTranslation('userEvent');
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleDetailedEvent, singleDetailedEventLoading } = useSelector((state) => state.event);
  const width = useMediaQuery('(max-width:768px)');
  const eventTypeValues = { ekId: singleDetailedEvent.ekId, typeName: singleDetailedEvent.name };
  const eventLocationValues = {
    locationId: singleDetailedEvent.locationId,
    locationName: singleDetailedEvent.locationName,
    postcode: singleDetailedEvent.postcode,
    street: singleDetailedEvent.street,
    houseNumber: singleDetailedEvent.houseNumber
  };
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
      <div className="justify-start p-3">
        <BackToButton />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Typography variant="h3">{`${singleDetailedEvent.title}`}</Typography>
          </div>
          <div className="flex justify-center p-6">
            <EditEventPictures />
          </div>
          <div>
            <div className="flex justify-between p-4">
              <div className="flex justify-start">
                <Typography variant="h5" component="h5">
                  {t('EDIT_EVENT')}:
                </Typography>
              </div>
              <div className="flex justify-end">
                <UserEditEvent event={singleDetailedEvent} />
              </div>
            </div>
            <div className={`grid ${width ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <Typography className="p-4" gutterBottom variant="h5" component="div">
                {`${t('ORGANIZER')}: ${singleDetailedEvent.userName}`}
              </Typography>

              <EditEventOneData
                value={singleDetailedEvent.title}
                label={t('EVENT_TITLE')}
                field="title"
                type="text"
              />

              <EditEventOneData
                value={singleDetailedEvent.email}
                label={t('BUISNESS_EMAIL')}
                field="email"
                type="email"
              />
              <EditEventOneData
                value={singleDetailedEvent.phoneNumber}
                label={t('BUISNESS_PHONE_NUM')}
                field="phoneNumber"
                type="tel"
              />
              <EditEventType type={eventTypeValues} />
              <EditEventLocation location={eventLocationValues} />
              <EditEventStartDate date={singleDetailedEvent.startDate} />
              <EditEventEndDate
                endDate={singleDetailedEvent.endDate}
                startDate={singleDetailedEvent.startDate}
              />
              <div className="p-4">
                <SingleEventDescription />
              </div>
              <Typography className="p-4" gutterBottom variant="h5" component="div">
                {`${t(`STATUS_${singleDetailedEvent.status}`)}`}
              </Typography>
            </div>
          </div>
          <UserEventTickets />
        </div>
      </div>
    </div>
  );
}

export default UserDetailedEvent;
