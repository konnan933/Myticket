import { Typography } from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getFilteredEvent, getPromotedEvents } from 'redux/thunks/Event';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import EventCards from './components/EventCards';
import Filters from './components/Filters';
import SlideShow from './components/SlideShow';
import Waves from './components/Waves';

function HomeContent() {
  const { t } = useTranslation('home');

  const { promotedEventsLoading, filteredEventLoading } = (state) => state.event;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFilteredEvent({
        date: '*',
        eventType: '*',
        location: '*'
      })
    );
    dispatch(getEventTypes());
    dispatch(getLocationNames());
    dispatch(getPromotedEvents());
  }, []);

  if ((promotedEventsLoading, filteredEventLoading)) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <SlideShow />
        <Waves />
        <Filters />
        <Typography variant="h2" align="center">
          {t('ALL_EVENTS')}
        </Typography>
        <EventCards />
      </div>
    </div>
  );
}
export default HomeContent;
