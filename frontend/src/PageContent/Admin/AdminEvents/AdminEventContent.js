import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes, getUserNames } from 'redux/thunks/Admin';
import Loader from 'PageContent/utils/Loader';
import EventsTable from './EventsTable';
import AddEvent from './components/AddEvent';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { eventTypes, eventTypesLoading, userNames, userNamesLoading } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {
    dispatch(getEventTypes());
    dispatch(getUserNames());
  }, []);

  if (eventTypes.lenght === 0 || eventTypesLoading || userNamesLoading || userNames.lenght === 0) {
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
