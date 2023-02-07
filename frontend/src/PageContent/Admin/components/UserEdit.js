import { Fade, IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import modalStyle from 'PageContent/utils/ModalStyle';

function UserEdit({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <IconButton onClick={handleOpen} color="primary" component="label">
        <CreateIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UserEdit;
