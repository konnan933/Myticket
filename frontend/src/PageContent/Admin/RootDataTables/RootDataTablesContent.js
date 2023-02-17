import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes } from 'redux/thunks/EventTypes';
import { getLocations } from 'redux/thunks/Location';
import { getTicketTypes } from 'redux/thunks/TicketTypes';
import EventTypesTable from './Tables/EventTypesTable';
import LocationsTable from './Tables/LocationsTable';
import TicketTypesTable from './Tables/TicketTypesTable';

function RootDataTablesContent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
    dispatch(getEventTypes());
    dispatch(getTicketTypes());
  }, []);

  const { eventTypes, eventTypesLoading } = useSelector((state) => state.eventTypes);
  const { locations, locationsLoading } = useSelector((state) => state.location);
  const { ticketTypes, ticketTypesLoading } = useSelector((state) => state.ticketTypes);

  if (
    eventTypesLoading ||
    eventTypes.length === 0 ||
    locationsLoading ||
    locations.length === 0 ||
    ticketTypesLoading ||
    ticketTypes.length === 0
  ) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <LocationsTable />
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-between w-4/5 ">
          <EventTypesTable />
          <TicketTypesTable />
        </div>
      </div>
    </>
  );
}

export default RootDataTablesContent;
