import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, deleteUser, getUsers } from 'redux/thunks/Admin';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { HashLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { padding } from '@mui/system';

function AdminUserContent() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { t } = useTranslation('adminUser');
  const { usersLoading } = useSelector((state) => state.admin);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const handleUserDelete = (id) => {
    console.log(id);
    dispatch(deleteUser(id));
  };

  if (usersLoading) {
    return (
      // TODO CSS FIX hogy kozépen legyen
      <div className="w-full flex justify-center items-center">
        <HashLoader color="#FBC95C" size={150} />
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full">
      <TableContainer style={{ margin: 30, maxWidth: '80%' }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">{t('EDIT')}</StyledTableCell>
              <StyledTableCell align="left">{t('USER')}</StyledTableCell>
              <StyledTableCell align="left">{t('EMAIL')}</StyledTableCell>
              <StyledTableCell align="left">{t('LEVEL')}</StyledTableCell>
              <StyledTableCell align="left">{t('PHONENUMBER')}</StyledTableCell>
              <StyledTableCell align="left">{t('PENALTIES')}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="left">
                  <IconButton
                    onClick={() => handleUserDelete(user.id)}
                    color="primary"
                    component="label">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="left">{user.fel_nev}</StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">{user.level}</StyledTableCell>
                <StyledTableCell align="left">{user.telefonszam}</StyledTableCell>
                <StyledTableCell align="left">{user.szab_sert_szam}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AdminUserContent;
