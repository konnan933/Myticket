import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import modalStyle from 'PageContent/utils/ModalStyle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

function SingleEventDescription() {
  const { t } = useTranslation('adminEvent');
  const [open, setOpen] = useState(false);

  const { singleDetailedEvent } = useSelector((state) => state.event);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="flex cursor-pointer hover:text-blue-600 hover:underline"
        onClick={handleClickOpen}>
        <Typography>{t('DESCRIPTION')}:</Typography>
        <Tooltip title={t('DETAILED_DESCRIPTION_INFO')} placement="right-start">
          <InfoOutlinedIcon color="inherit" />
        </Tooltip>
      </div>
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
          <div className="flex justify-center pb-10 pt-5">
            <Typography>{t('DESCRIPTION')}</Typography>
          </div>
          <div className="flex justify-center">
            <Typography>{singleDetailedEvent.description}</Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SingleEventDescription;
