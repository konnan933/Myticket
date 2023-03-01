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
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import DeleteEvent from './components/DeleteEvent';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

function EventsTable() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const { t } = useTranslation('adminEvent');
  return (
    <div className="flex justify-center w-full">
      <TableContainer style={{ margin: 10, width: '70%' }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">{t('ACTIONS')}</StyledTableCell>
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
              <StyledTableRow key={event.eventId}>
                <StyledTableCell align="left">
                  <div className="flex">
                    <DeleteEvent id={event.eventId} />
                    <EditEvent event={event} />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link to={`${event.eventId}`}>
                    <p className="cursor-pointer hover:text-blue-600 hover:underline">
                      {event.title}
                    </p>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="left">{event.userName}</StyledTableCell>
                <StyledTableCell align="left">
                  {`${event.postcode} ${event.district} ${event.street} ${t('STREET')} ${
                    event.houseNumber
                  }`}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default EventsTable;
