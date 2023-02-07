import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'redux/thunks/Admin';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function DeleteUser({ id }) {
  const { t } = useTranslation('adminUser');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    handleClose();
    dispatch(deleteUser(id));
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen} color="red" component="label">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{t('DELETE')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('CONFIRMDELETE')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('NO')}</Button>
          <Button onClick={onDelete} autoFocus>
            {t('YES')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteUser;
