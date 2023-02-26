import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function UserEventsTable({ userEvents }) {
  const { t } = useTranslation('adminEvent');

  return (
    <div>
      <div className="p-4">
        <p>{`${userEvents[0].fel_nev} ${t('USER_EVENTS')}`}</p>
        <br></br>
        <p>{t('IF_DELETE_USER')}</p>
        <br></br>
        <p>{t('CONFIRM_DELETE_USER')}</p>
      </div>
      <div className="flex justify-center pb-10 pt-5">
        <TableContainer style={{ margin: 10, width: '70%' }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{t('EVENT_NAME')}</StyledTableCell>
                <StyledTableCell align="left">{t('START_DATE')}</StyledTableCell>
                <StyledTableCell align="left">{t('END_DATE')}</StyledTableCell>
                <StyledTableCell align="left">{t('STATUS')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userEvents.map((userEvent) => (
                <StyledTableRow key={userEvent.eventId}>
                  <StyledTableCell align="left">
                    <Link to={`${userEvent.eventId}`}>
                      <p className="cursor-pointer hover:text-blue-600 hover:underline">
                        {userEvent.cim}
                      </p>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">{userEvent.kezd_datum}</StyledTableCell>
                  <StyledTableCell align="left">{userEvent.veg_datum}</StyledTableCell>
                  <StyledTableCell align="left">{userEvent.statusz}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default UserEventsTable;