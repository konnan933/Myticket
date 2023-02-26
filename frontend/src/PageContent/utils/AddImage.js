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
  const [isSent, setIsSent] = useState(false);

  const displayImage = path && !open && isSent;
  const displayRemoveButton = path && !open && isSent;
  const displayAddButton = !open && !isSent;

  return (
    <div>
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
                      });
                    }}>
                    {t('SEND_IMAGE')}
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