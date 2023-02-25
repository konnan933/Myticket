import { Box, Button, Modal, Typography } from '@mui/material';
import modalStyle from 'PageContent/utils/ModalStyle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changePicture } from 'redux/thunks/Admin';

function ChangeEventPicture() {
  const dispatch = useDispatch();
  const [path, setPath] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { t } = useTranslation('adminEvent');
  const [isSent, setIsSent] = useState(false);

  const displayAddButton = !open && !isSent;

  return (
    <div>
      <div className="flex justify-center">
        {displayAddButton && (
          <Button onClick={handleOpen} color="primary" variant="outlined" component="label">
            {t('CHANGE_PICTURE')}
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            {!path && (
              <input
                type="file"
                name="path"
                onChange={(event) => {
                  setPath(event.target.files[0]);
                }}
              />
            )}
            {path && (
              <div className="flex justify-center flex-col">
                <div className="flex justify-center py-4">
                  <Typography variant="h6">{t('CONFIRM_CHANGE_PICTURE')}</Typography>
                </div>
                <div className="flex justify-center">
                  <img alt="not fount" width={'50%'} src={URL.createObjectURL(path)} />
                </div>
                <br />
                <div className="flex justify-evenly">
                  <Button
                    onClick={() => {
                      dispatch(changePicture({ path, id })).then(() => {
                        setIsSent(true);
                        setOpen(false);
                      });
                    }}>
                    {t('SEND_IMAGE')}
                  </Button>
                  <Button
                    onClick={() => {
                      setPath(null);
                    }}>
                    {t('CHANGE_PICTURE')}
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ChangeEventPicture;
