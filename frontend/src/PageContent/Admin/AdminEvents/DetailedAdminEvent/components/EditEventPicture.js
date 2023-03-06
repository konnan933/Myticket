import { Box, IconButton, Modal, Typography } from '@mui/material';
import pictureModalStyle from 'PageContent/utils/PictureModalStyle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeEventPicture from '../../../../utils/ChangeEventPicture';
import CloseIcon from '@mui/icons-material/Close';
import event from '../../../../../API/Event';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function EditEventPictures() {
  const { t } = useTranslation('adminEvent');
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { singleDetailedEvent } = useSelector((state) => state.event);

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
      <div className="flex  justify-center p-2.5">
        <LazyLoadImage
          className="w-full cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
          onClick={handleClickOpen}
          alt="Esemeny kep"
          src={`${event.eventPicture}${id}`}
          effect="blur"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={pictureModalStyle}>
          <div className="flex justify-end">
            <IconButton color="error" onClick={handleClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </div>
          <div className="flex justify-center pb-10 pt-5 ">
            <Typography>{`${singleDetailedEvent.title} ${t('EVENT_PICTURE')}`}</Typography>
          </div>
          <img src={`${event.eventPicture}${id}`} className="w-full " />
        </Box>
      </Modal>
    </div>
  );
}
export default EditEventPictures;
