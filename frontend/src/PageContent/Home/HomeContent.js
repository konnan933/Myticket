import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getFilteredEvent, getPromotedEvents } from 'redux/thunks/Event';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import Filters from './components/Filters';
import SlideShow from './components/SlideShow';

function HomeContent() {
  const { t } = useTranslation('home');

  const { promotedEvents, promotedEventsLoading } = (state) => state.event;

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

  if (promotedEventsLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <SlideShow />
        <Filters />
        <div>Fő események</div>
        <div>összes események kartyák</div>
      </div>
    </div>
  );
}
export default HomeContent;
