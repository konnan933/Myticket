import { Add } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import EditUserForm from '../AdminUserForms/EditUserForm';

function EditUserButton({ user }) {
  console.log(user);
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
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <div className="flex justify-center">
              <h2>{t('ADD_USER')}</h2>
            </div>
            <EditUserForm user={user} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default EditUserButton;
