import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ModalStyle from './BigModalStyle';
import CloseIcon from '@mui/icons-material/Close';
import { addPicture } from 'redux/thunks/Picture';

function Addimage({ setImageId }) {
  const dispatch = useDispatch();
  const [path, setPath] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminEvent');
  const [isSent, setIsSent] = useState(false);

  const displayImage = path && !open && isSent;
  const displayRemoveButton = path && !open && isSent;
  const displayAddButton = !open && !isSent;
  const imageRequired = path === null;
  const [isNotValid, setIsNotValid] = useState(false);

  const checkDimensions = (imgUrl) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgUrl);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const { height, width } = image;
        console.log(height);
        console.log(width);
        if (width === 1280 && height === 720) {
          setIsNotValid(false);
          setPath(imgUrl);
        } else {
          setIsNotValid(true);
        }
      };
    };
  };

  return (
    <div>
      {imageRequired && (
        <div className="flex justify-center text-red-600">
          <p>{t('IMAGE_REQUIRED')}</p>
        </div>
      )}

      <div className="flex justify-center">
        {displayAddButton && (
          <Button onClick={handleOpen} color="primary" component="label">
            {t('ADD_IMAGE')}
          </Button>
        )}
        {displayRemoveButton && (
          <Button
            onClick={() => {
              setPath(null);
              setIsSent(false);
              setImageId('');
            }}>
            {t('REMOVE_IMAGE')}
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalStyle}>
            <div className="flex justify-end">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <h2>{t('ADD_IMAGE')}</h2>
            </div>
            <div className="flex justify-center p-4">
              <Typography variant="h7">{t('PICTIURE_SIZE')}</Typography>
            </div>
            {!path && (
              <input
                type="file"
                name="path"
                onChange={(event) => {
                  if (checkDimensions(event.target.files[0])) {
                    setPath(event.target.files[0]);
                    console.log('asd');
                  } else {
                    console.log('jo');
                  }
                }}
              />
            )}
            {isNotValid && (
              <div>
                <div className="flex justify-center p-2">
                  <Typography className="text-red-500" variant="h7">
                    {t('PICTIURE_NOT_VALID')}
                  </Typography>
                </div>
                <div className="flex justify-center p-2">
                  <Typography variant="h7">{t('PLEASE_ADD_OTHER_IMAGE')}</Typography>
                </div>
              </div>
            )}
            {path && (
              <div>
                <div className="flex justify-center">
                  <img alt="not fount" width={'50%'} src={URL.createObjectURL(path)} />
                </div>
                <br />
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      dispatch(addPicture(path)).then((respone) => {
                        setIsSent(true);
                        setImageId(respone.payload);
                        setOpen(false);
                      });
                    }}>
                    {t('SEND_IMAGE')}
                  </Button>
                  <Button
                    onClick={() => {
                      setPath(null);
                      setIsSent(false);
                      setImageId('');
                    }}>
                    {t('CHANGE_PICTURE')}
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      {displayImage && (
        <div className="flex justify-center">
          <img alt="not fount" width={'50%'} src={URL.createObjectURL(path)} />
        </div>
      )}
    </div>
  );
}

export default Addimage;
