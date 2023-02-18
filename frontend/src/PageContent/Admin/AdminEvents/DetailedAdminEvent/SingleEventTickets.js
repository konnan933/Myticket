import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Loader from 'PageContent/utils/Loader';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function SingleEventTickets() {
  const { t } = useTranslation('adminEvent');

  const { eventTickets, eventTicketsLoading } = useSelector((state) => state.ticket);

  if (eventTicketsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="p-8">
        <Typography variant="h5">{t('TICKETS')}</Typography>
      </div>
      <div className="flex justify-center w-full">
        <TableContainer style={{ margin: 10, width: '70%' }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{t('TICKET_TYPE_NAME')}</StyledTableCell>
                <StyledTableCell align="left">{t('ALL_TICKET')}</StyledTableCell>
                <StyledTableCell align="left">{t('BOOKED_TICKET')}</StyledTableCell>
                <StyledTableCell align="left">{t('FREE_TICKET')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventTickets.map((ticket) => (
                <StyledTableRow key={ticket.eszmei_jegy_id}>
                  <StyledTableCell align="left">{ticket.name}</StyledTableCell>
                  <StyledTableCell align="left">{`${ticket.ossz_menny} ${t(
                    'PORTION'
                  )}`}</StyledTableCell>
                  <StyledTableCell align="left">{`${ticket.lefog_menny} ${t(
                    'PORTION'
                  )}`}</StyledTableCell>
                  <StyledTableCell align="left">{`${ticket.szabad_menny} ${t(
                    'PORTION'
                  )}`}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default SingleEventTickets;
