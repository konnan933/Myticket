import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNames } from 'redux/thunks/Admin';
import Loader from 'PageContent/utils/Loader';
import EventsTable from './EventsTable';
import AddEvent from './components/AddEvent';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocationNames } from 'redux/thunks/Location';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { userNames, userNamesLoading } = useSelector((state) => state.admin);
  const { eventTypes, eventTypesLoading } = useSelector((state) => state.eventTypes);
  const { locationNames, locationNamesLoading } = useSelector((state) => state.location);

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
        <div className="flex justify-center">
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
