import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import LocationEditForm from '../Forms/LocationEditForm';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

function LocationEdit({ location }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('rootData');
  const matches = useMediaQuery('(min-width:765px)');

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
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: matches ? '40%' : '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 7,
              overflowY: 'auto',
              height: matches ? '90%' : '99%'
            }}>
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
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
