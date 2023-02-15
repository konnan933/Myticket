import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes, getUserNames } from 'redux/thunks/Admin';
import Loader from 'PageContent/utils/Loader';
import EventsTable from './EventsTable';

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
    <div>
      <div className="flex justify-center w-full">
        <EventsTable />
      </div>
    </div>
  );
}
export default AdminEventContent;
