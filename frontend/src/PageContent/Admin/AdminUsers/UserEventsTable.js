import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CanDeleteUserDialog from './components/CanDeleteUSerDialog';
import CantDeleteUserDialog from './components/CantDeleteUserDialog';

function UserEventsTable({ userEvents, hasAcceptedEvent }) {
  const { t } = useTranslation('adminEvent');

  return (
    <div>
      {hasAcceptedEvent ? (
        <CantDeleteUserDialog userEvents={userEvents} />
      ) : (
        <CanDeleteUserDialog userEvents={userEvents} />
      )}

      <div className="flex justify-center pb-10 pt-5">
        <TableContainer
          style={{ margin: 10, width: '70%' }}
          component={Paper}>
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
                    <Link to={`adminEvents/${userEvent.eventId}`} replace>
                      <p className="cursor-pointer hover:text-blue-600 hover:underline">
                        {userEvent.title}
                      </p>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">{userEvent.startDate}</StyledTableCell>
                  <StyledTableCell align="left">{userEvent.endDate}</StyledTableCell>
                  <StyledTableCell align="left">{userEvent.status}</StyledTableCell>
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
