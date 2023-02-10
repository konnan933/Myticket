import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, deleteUser, getUsers } from 'redux/thunks/Admin';
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
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { padding } from '@mui/system';
import AddUser from './components/AddUser';
import DeleteUser from './components/DeleteUser';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import UserEdit from './components/UserEdit';

function AdminUserContent() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { t } = useTranslation('adminUser');
  const { usersLoading } = useSelector((state) => state.admin);

  if (usersLoading) {
    return (
      // TODO CSS FIX hogy kozépen legyen
      <div className="w-full flex justify-center items-center">
        <HashLoader color="#FBC95C" size={150} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center w-full">
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
                <StyledTableCell align="left">{t('PHONENUMBER')}</StyledTableCell>
                <StyledTableCell align="center">{t('PENALTIES')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <UserEdit id={user.id} />
                      <DeleteUser id={user.id} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.fel_nev}</StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  {user.level === 1 ? (
                    <StyledTableCell align="left">{t('ADMIN')}</StyledTableCell>
                  ) : (
                    <StyledTableCell align="left">{t('USER')}</StyledTableCell>
                  )}
                  <StyledTableCell align="left">{user.telefonszam}</StyledTableCell>
                  <StyledTableCell align="center">{user.szab_sert_szam}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default AdminUserContent;
