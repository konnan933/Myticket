import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import LocationEditForm from '../Forms/LocationEditForm';
import CloseIcon from '@mui/icons-material/Close';

function LocationEdit({ location }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('rootData');

  return (
    <div>
      <div>
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
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
              <h2>{t('MANAGE_LOCATION')}</h2>
            </div>
            <LocationEditForm location={location} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default LocationEdit;
