import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import DeleteUser from './components/DeleteUser';
import AddUser from './components/AddUser';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import EditUserButton from './components/EditUserButton';

function UsersTable() {
  const { t } = useTranslation('adminUser');

  const { users } = useSelector((state) => state.admin);

  return (
    <TableContainer style={{ margin: 30, maxWidth: '70%' }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              <AddUser />
            </StyledTableCell>
            <StyledTableCell align="left">{t('USER_NAME')}</StyledTableCell>
            <StyledTableCell align="left">{t('EMAIL')}</StyledTableCell>
            <StyledTableCell align="left">{t('LEVEL')}</StyledTableCell>
            <StyledTableCell align="left">{t('PHONE_NUMBER')}</StyledTableCell>
            <StyledTableCell align="center">{t('PENALTIES')}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell align="left">
                <div className="flex">
                  <EditUserButton user={user} />
                  <DeleteUser id={user.id} />
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">{user.fel_nev}</StyledTableCell>
              <StyledTableCell align="left">{user.email}</StyledTableCell>

              <StyledTableCell align="left">{t('LEVEL_' + user.level)}</StyledTableCell>

              <StyledTableCell align="left">{user.telefonszam}</StyledTableCell>
              <StyledTableCell align="center">{user.faults}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default UsersTable;
