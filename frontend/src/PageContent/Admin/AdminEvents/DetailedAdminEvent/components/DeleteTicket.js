import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import modalStyle from 'PageContent/utils/ModalStyle';
import { deleteEventTicket } from 'redux/thunks/Ticket';
import { useParams } from 'react-router-dom';

function DeleteTicket({ ticketId }) {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    handleClose();
    dispatch(deleteEventTicket({ ticketId, id }));
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
            <Typography>{t('CONFIRM_DELETE_TICKET')}</Typography>
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

export default DeleteTicket;
