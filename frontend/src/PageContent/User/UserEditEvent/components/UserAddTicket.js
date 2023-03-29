import { Box, IconButton, Modal, Typography } from '@mui/material';
import modalStyle from 'PageContent/utils/ModalStyle';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrency } from 'redux/thunks/Currencies';
import { getTicketTypes } from 'redux/thunks/TicketTypes';
import { getSingleEvent } from 'redux/thunks/Event';
import TicketAddForm from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/components/TicketAddForm';
import Loader from 'PageContent/utils/Loader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function UserAddTicket() {
  const [open, setOpen] = useState(false);
  const { singleEvent } = useSelector((state) => state.event);
  const { eventTicketsLoading } = useSelector((state) => state.ticket);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { t } = useTranslation('userEvent');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getTicketTypes());
    dispatch(getSingleEvent(id));
  }, []);

  if (eventTicketsLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <Typography variant="h3">{`${singleEvent.title} ${t('TICKETS')}`}</Typography>
        <IconButton onClick={handleOpen}>
          <AddCircleOutlineIcon fontSize="medium" />
        </IconButton>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <h2>{t('ADD_TICKETS')}</h2>
            </div>
            <TicketAddForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
export default UserAddTicket;
