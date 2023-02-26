import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import TicketTypesEditForm from '../Forms/TicketTypesEditForm';
function TicketTypesEdit({ ticketType }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('rootData');

  return (
    <div>
      <div>
        <div>
          <IconButton onClick={handleOpen} color="primary">
            <EditIcon />
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
              <h2>{t('EDIT_TT')}</h2>
            </div>
            <TicketTypesEditForm ticketType={ticketType} handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TicketTypesEdit;