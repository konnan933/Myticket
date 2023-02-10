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
import DeleteUser from './components/DeleteUser';
import AddUser from './components/AddUser';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import EditUserButton from './components/EditUserButton';
import UsersTable from './UsersTable';

function AdminUserContent() {
  const { t } = useTranslation('adminUser');

  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (usersLoading || users.length === 0) {
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
        <UsersTable />
      </div>
    </div>
  );
}
export default AdminUserContent;
