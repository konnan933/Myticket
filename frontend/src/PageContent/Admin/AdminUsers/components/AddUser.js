import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddUserForm from '../AdminUserForms/AddUserForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

function AddUser() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminUser');

  return (
    <div>
      <div>
        {t('ACTIONS')}
        <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
          <AddCircleOutlineIcon />
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
              width: '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 7
            }}>
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <h2>{t('ADD_USER')}</h2>
            </div>
            <AddUserForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddUser;
