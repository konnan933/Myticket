import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'redux/thunks/Admin';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import modalStyle from 'PageContent/utils/ModalStyle';

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
      <IconButton onClick={handleClickOpen} color="error" component="label">
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div className="flex justify-center pb-10 pt-5">
            <Typography>{t('CONFIRM_DELETE')}</Typography>
          </div>
          <div className="flex justify-evenly">
            <Button variant="outlined" onClick={handleClose}>
              {t('NO')}
            </Button>
            <Button variant="outlined" onClick={onDelete} color="error" autoFocus>
              {t('YES')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUser;
