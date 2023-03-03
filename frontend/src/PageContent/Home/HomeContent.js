import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';
import Filters from './components/Filters';

function HomeContent() {
  const { t } = useTranslation('home');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventTypes());
    dispatch(getLocationNames());
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <Filters />
        <div>Fő események</div>
        <div>összes események kartyák</div>
      </div>
    </div>
  );
}
export default HomeContent;
