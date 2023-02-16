import Loader from 'PageContent/utils/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from 'redux/thunks/Location';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import LocationEdit from '../components/LocationEdit';
import LocationDelete from '../components/LocationDelete';

function LocationsTable() {
  const { t } = useTranslation('rootData');
  const dispatch = useDispatch();
  const { locations, locationsLoading } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getLocations());
  }, []);
  if (locationsLoading || locations.length === 0) {
    return <Loader />;
  }

  const returnEmpty = (data) => {
    if (data === '') {
      return '-';
    }
    return data;
  };
  return (
    <>
      <div className="flex justify-center w-full">
        <TableContainer style={{ margin: 10, width: '70%' }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{t('ACTIONS')}</StyledTableCell>
                <StyledTableCell align="left">{t('NAME')}</StyledTableCell>
                <StyledTableCell align="left">{t('POST_CODE')}</StyledTableCell>
                <StyledTableCell align="left">{t('STREET')}</StyledTableCell>
                <StyledTableCell align="left">{t('HOUSE_NUMBER')}</StyledTableCell>
                <StyledTableCell align="left">{t('DISTRICT')}</StyledTableCell>
                <StyledTableCell align="left">{t('FLOOR')}</StyledTableCell>
                <StyledTableCell align="left">{t('ROOM')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((oneLoc) => (
                <StyledTableRow key={oneLoc.id}>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <LocationEdit location={oneLoc} />
                      <LocationDelete id={oneLoc.id} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{oneLoc.name}</StyledTableCell>
                  <StyledTableCell align="left">{oneLoc.postcode}</StyledTableCell>
                  <StyledTableCell align="left">{oneLoc.street}</StyledTableCell>
                  <StyledTableCell align="left">{oneLoc.housenumber}</StyledTableCell>
                  <StyledTableCell align="left">{returnEmpty(oneLoc.district)}</StyledTableCell>
                  <StyledTableCell align="left">{returnEmpty(oneLoc.floor)}</StyledTableCell>
                  <StyledTableCell align="left">{returnEmpty(oneLoc.room)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default LocationsTable;
