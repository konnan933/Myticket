import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from 'redux/thunks/Admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import EditEvent from './components/EditEvent';
import AddEvent from './components/AddEvent';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import Loader from 'PageContent/utils/Loader';
import DeleteEvent from './components/DeleteEvent';
import { Link, Tooltip } from '@mui/material';

function AdminEventContent() {
  const dispatch = useDispatch();
  const { events, eventsLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const { t } = useTranslation('adminEvent');
  console.log(events);

  if (eventsLoading || events.lenght === 0 || events[0] === undefined) {
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
                <StyledTableCell align="left">
                  <div className="flex">
                    {t('EVENTNAME')}
                    <div className="px-3">
                      <Tooltip title={t('DETAILED_INFO')} placement="right-start">
                        <InfoOutlinedIcon color="inherit" />
                      </Tooltip>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">{t('ORGANIZER')}</StyledTableCell>
                <StyledTableCell align="left">{t('LOCATION')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <StyledTableRow key={event.id}>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <DeleteEvent id={event.id} />
                      <EditEvent id={event.id} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link href={'adminEvents/' + event.id} underline="hover">
                      {event.cim}
                    </Link>
                  </StyledTableCell>
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
