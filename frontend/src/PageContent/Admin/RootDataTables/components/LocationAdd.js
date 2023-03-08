import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationAddForm from '../Forms/LocationAddForm';
import CloseIcon from '@mui/icons-material/Close';

function LocationAdd() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('rootData');

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
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <h2>{t('ADD_LOCATION')}</h2>
            </div>
            <LocationAddForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default LocationAdd;
