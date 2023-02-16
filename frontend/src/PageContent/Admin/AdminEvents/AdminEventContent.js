import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes, getUserNames } from 'redux/thunks/Admin';
import { getLocationNames } from 'redux/thunks/Location';
import Loader from 'PageContent/utils/Loader';
import EventsTable from './EventsTable';
import AddEvent from './components/AddEvent';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { eventTypes, eventTypesLoading, userNames, userNamesLoading } = useSelector(
    (state) => state.admin
  );

  const { locationNames, locationNamesLoading } = useSelector((state) => state.locations);
  useEffect(() => {
    dispatch(getEventTypes());
    dispatch(getUserNames());
    dispatch(getLocationNames());
  }, []);

  if (
    eventTypes.lenght === 0 ||
    eventTypesLoading ||
    userNamesLoading ||
    userNames.lenght === 0 ||
    locationNames.lenght === 0 ||
    locationNamesLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center ">
      <div className="w-3/4">
        <div className="flex justify-start">
          <AddEvent />
        </div>
        <div className="flex justify-center w-full">
          <EventsTable />
        </div>
      </div>
    </div>
  );
}
export default AdminEventContent;
