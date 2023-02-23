import { Box, Modal, Typography } from '@mui/material';
import admin from 'API/Admin';
import pictureModalStyle from 'PageContent/utils/PictureModalStyle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeEventPicture from './ChangeEventPicture';

function EditEventPictures() {
  const { t } = useTranslation('adminEvent');
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { singleDetailedEvent } = useSelector((state) => state.admin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex  justify-center">
        <ChangeEventPicture />
      </div>
      <div className="flex  justify-center">
        <img
          src={`${admin.eventPicture}${id}`}
          className="w-1/2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
          onClick={handleClickOpen}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={pictureModalStyle}>
          <div className="flex justify-center pb-10 pt-5 ">
            <Typography>{`${singleDetailedEvent.cim} ${t('EVENT_D_PAGE')}`}</Typography>
          </div>
          <img src={`${admin.eventPicture}${id}`} className="w-full " />
        </Box>
      </Modal>
    </div>
  );
}
export default EditEventPictures;
