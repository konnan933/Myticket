import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import EditUserForm from '../AdminUserForms/EditUserForm';
import CloseIcon from '@mui/icons-material/Close';

function EditUserButton({ user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminUser');

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
          sx={{ overflowY: 'hidden' }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxHeight: '90%',
              overflowY: 'auto',
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
              <h2>{t('MANAGE_USER')}</h2>
            </div>
            <EditUserForm user={user} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditUserButton;
