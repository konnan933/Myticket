import {
  Box,
  Button,
  IconButton,
  Modal,
  TextareaAutosize,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import modalStyle from 'PageContent/utils/ModalStyle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';

function EditEventDescription() {
  const [open, setOpen] = useState(false);
  const width = useMediaQuery('(max-width:768px)');
  const { singleEvent } = useSelector((state) => state.event);
  const [localValue, setLocalValue] = useState(singleEvent.description);
  const [isEdit, setIsEdit] = useState(false);
  const id = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation('userEvent');
  const { register } = useForm();
  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent.description = localValue;

    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const localValueOnchangeHandler = (event) => {
    setLocalValue(event.target.value);
  };

  return (
    <div>
      <div>
        <div
          className="flex cursor-pointer hover:text-blue-600 hover:underline"
          onClick={handleClickOpen}>
          <Typography gutterBottom>{t('DESCRIPTION')}:</Typography>
          <Tooltip title={t('DETAILED_DESCRIPTION_INFO')} placement="right-start">
            <InfoOutlinedIcon color="inherit" />
          </Tooltip>
        </div>
        {width && (
          <div>
            <Typography variant="inherit" component="div">
              {t('CLICK_TO_OPEN')}
            </Typography>
          </div>
        )}
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
            {isEdit ? (
              <form className="flex flex-row h-full w-4/5 p-4" onSubmit={handleOnSubmit}>
                <TextareaAutosize
                  {...register('description')}
                  type="text"
                  value={localValue}
                  onChange={localValueOnchangeHandler}
                  placeholder={t('DESCRIPTION')}
                  className="border-2 w-full p-3 mt-5"
                />
                <div className="flex justify-between">
                  <IconButton color="error" onClick={() => setIsEdit(false)}>
                    <CloseIcon />
                  </IconButton>
                  <Button onClick={handleOnSubmit}>{t('SAVE')}</Button>
                </div>
              </form>
            ) : (
              <div>
                <Typography
                  className="cursor-pointer break-all transition ease-in-out delay-150 hover:scale-110 duration-300"
                  onClick={() => setIsEdit(true)}
                  variant="h5"
                  component="div">
                  {singleEvent.description}
                </Typography>
                {width && (
                  <div className="flex justify-center">
                    <Typography variant="inherit" component="div">
                      {t('CLICK_EDIT')}
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditEventDescription;
