import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocations } from 'redux/thunks/Location';
import EventTypesTable from './Tables/EventTypesTable';
import LocationsTable from './Tables/LocationsTable';

function RootDataTablesContent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
    dispatch(getEventTypes());
  }, []);

  const { eventTypes, eventTypesLoading } = useSelector((state) => state.eventTypes);
  const { locations, locationsLoading } = useSelector((state) => state.location);

  if (eventTypesLoading || eventTypes.length === 0 || locationsLoading || locations.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <LocationsTable />
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-between w-full ">
          <EventTypesTable />
        </div>
      </div>
    </>
  );
}

export default RootDataTablesContent;
