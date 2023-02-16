import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addPicture } from 'redux/thunks/Admin';
import ModalStyle from './BigModalStyle';

function Addimage({ setImageId }) {
  const dispatch = useDispatch();
  const [path, setPath] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation('adminEvent');

  const displayImage = path && !open;

  return (
    <div>
      <div>
        <Button onClick={handleOpen} color="primary" component="label">
          {t('ADD_IMAGE')}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalStyle}>
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
              <div>
                <img alt="not fount" width={'50%'} src={URL.createObjectURL(path)} />
                <br />
                <Button onClick={() => setPath(null)}> {t('REMOVE_IMAGE')}</Button>
                <Button
                  onClick={() => {
                    dispatch(addPicture(path)).then((respone) => {
                      setImageId(respone.payload);
                    });
                  }}>
                  {t('SEND_IMAGE')}
                </Button>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      {displayImage && (
        <div>
          <img alt="not fount" width={'50%'} src={URL.createObjectURL(path)} />
        </div>
      )}
    </div>
  );
}

export default Addimage;
