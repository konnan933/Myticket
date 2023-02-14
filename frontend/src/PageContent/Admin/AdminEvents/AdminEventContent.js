import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from 'redux/thunks/Admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import EditEvent from './components/EditEvent';
import AddEvent from './components/AddEvent';
import EventDetails from './components/EventDetails';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import Loader from 'PageContent/utils/Loader';
import DeleteEvent from './components/DeleteEvent';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { events, eventsLoading } = useSelector((state) => state.admin);
  const { eventTypes } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const { t } = useTranslation('adminEvent');

  if (eventsLoading || events.lenght === 0 || eventTypes.lenght === 0) {
    return <Loader />;
  }

  return (
    <div>
      <AddEvent eventTypes={eventTypes} />
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
              {events.map((event) => (
                <StyledTableRow key={event.id}>
                  <StyledTableCell align="left">
                    <DeleteEvent id={event.id} />
                    <EditEvent id={event.id} />
                    <EventDetails id={event.id} />
                  </StyledTableCell>
                  <StyledTableCell align="left">{event.cim}</StyledTableCell>
                  <StyledTableCell align="left">{event.fel_nev}</StyledTableCell>
                  <StyledTableCell align="left">
                    {`${event.iranyitoszam} ${event.kerulet} ${event.utca} ${event.hazszam}`}
                  </StyledTableCell>
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
