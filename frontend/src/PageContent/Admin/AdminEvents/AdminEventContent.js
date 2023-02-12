import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { /* deleteEvent, */ getEvents } from 'redux/thunks/Admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import EditEvent from './components/EditEvent';
import AddEvent from './components/AddEvent';
import DeleteEvent from './components/DeleteEvent';
import EventDetails from './components/EventDetails';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import Loader from 'PageContent/utils/Loader';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const { t } = useTranslation('adminUser');
  const { eventsLoading } = useSelector((state) => state.admin);

  if (eventsLoading) {
    return <Loader />;
  }
  return (
    <div>
      <AddEvent />
      <div className="flex justify-center w-full">
        <TableContainer style={{ margin: 30, maxWidth: '70%' }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{t('EDIT')}</StyledTableCell>
                <StyledTableCell align="left">{t('EVENTNAME')}</StyledTableCell>
                <StyledTableCell align="left">{t('ORGANIZER')}</StyledTableCell>
                <StyledTableCell align="left">{t('LOCATION')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <StyledTableRow key={event.id}>
                  <StyledTableCell align="left">
                    <DeleteEvent id={event.id} />
                    <EditEvent id={event.id} />
                    <EventDetails id={event.id} />
                  </StyledTableCell>
                  <StyledTableCell align="left">{event.cim}</StyledTableCell>
                  <StyledTableCell align="left">{event.user}</StyledTableCell>
                  <StyledTableCell align="left">{event.helyszin}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default AdminEventContent;
