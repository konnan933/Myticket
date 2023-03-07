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
import UserEditEvent from './components/UserEditEvent';

function UserDetailedEvent() {
  const width = useMediaQuery('(max-width:768px)');
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
  console.log(width);

  if (singleDetailedEventLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="justify-start p-6">
        <BackToButton />
      </div>
      <div className="justify-center items-center">
        <div>
          <div className={`flex ${width ? 'flex-col' : 'flex-row'} border-4 rounded-md p-4`}>
            <div className="pt-10">
              <EditEventPictures />
            </div>
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
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('EVENTNAME')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.title}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('ORGANIZER')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.userName}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('BUISNESS_EMAIL')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.email}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('BUISNESS_PHONE_NUM')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.phoneNumber}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('EVENT_TYPE')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.name}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('LOCATION')}
                </Typography>
                <Typography variant="h5" component="h5">{`: ${singleDetailedEvent.postcode} ${
                  singleDetailedEvent.district
                } ${singleDetailedEvent.street} ${t('STREET')} ${
                  singleDetailedEvent.houseNumber
                }`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('START_DATE')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.startDate}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('END_DATE')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.endDate}`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t('COMISSION')}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5">{`: ${singleDetailedEvent.comission}%`}</Typography>
              </div>
              <div className="flex ">
                <Typography variant="h5" component="h5">
                  {t(`STATUS`)}
                </Typography>
                <Typography variant="h5" component="h5">{`: ${t(
                  `STATUS_${singleDetailedEvent.status}`
                )}`}</Typography>
              </div>
              <div className="flex ">
                <SingleEventDescription />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailedEvent;
