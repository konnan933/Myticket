import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from 'redux/thunks/Location';

function LocationsTable() {
  const dispatch = useDispatch();
  const { locations, locationsLoading } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getLocations());
  }, []);
  if (locationsLoading || locations.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <h1>tabel</h1>
    </>
  );
}
export default LocationsTable;
