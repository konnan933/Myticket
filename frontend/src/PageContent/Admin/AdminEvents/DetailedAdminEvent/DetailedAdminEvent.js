import { Typography } from '@mui/material';
//import admin from 'API/Admin';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from 'redux/thunks/Admin';
import { getEventTickets } from 'redux/thunks/Ticket';
import BackToButton from './components/BackToButton';
import EditEventPictures from './components/EditEventPicture';
import SingleEventTickets from './SingleEventTickets';

function DetailedAdminEvent() {
  const { t } = useTranslation('adminEvent');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleEvent, singleEventLoading } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getSingleEvent(id));
    dispatch(getEventTickets(id));
  }, []);

  if (singleEventLoading) {
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
            <Typography variant="h4">{`${singleEvent.cim} ${t('EVENT_D_PAGE')}`}</Typography>
          </div>
          <div className="flex justify-center">
            <EditEventPictures />
          </div>
          <SingleEventTickets />
        </div>
      </div>
    </div>
  );
}
export default DetailedAdminEvent;
