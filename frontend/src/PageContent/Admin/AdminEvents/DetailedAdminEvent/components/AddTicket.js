import { Box, IconButton, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TicketAddForm from './TicketAddForm';
import { getCurrency } from 'redux/thunks/Currencies';
import { useDispatch } from 'react-redux';
import { getTicketTypes } from 'redux/thunks/TicketTypes';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from 'redux/thunks/Admin';
import CloseIcon from '@mui/icons-material/Close';

function AddTicket() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { t } = useTranslation('rootData');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getTicketTypes());
    dispatch(getSingleEvent(id));
  }, []);

  return (
    <div>
      <div>
        <div>
          {t('ACTIONS')}
          <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <div className="flex justify-center">
              <div className="flex justify-end">
                <IconButton color="error" onClick={handleClose}>
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </div>
              <div className="flex justify-center">
                <h2>{t('ADD_TICKETS')}</h2>
              </div>
            </div>
            <TicketAddForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddTicket;
