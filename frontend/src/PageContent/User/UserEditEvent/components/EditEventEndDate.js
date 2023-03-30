import { Button, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';
import CloseIcon from '@mui/icons-material/Close';

function EditEventEndDate({ endDate, startDate }) {
  const { t } = useTranslation('userEvent');
  const width = useMediaQuery('(max-width:768px)');
  const { singleEvent } = useSelector((state) => state.event);
  const cantEdit =
    singleEvent.startDate <=
    moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD HH:mm:ss');
  const { register } = useForm();
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const id = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [endDateErrorMsg, setEndDateErrorMsg] = useState('');
  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent.endDate = moment(localEndDate).format('YYYY-MM-DD HH:mm:ss');
    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };

  const endDateChangeHandler = (event) => {
    if (event.target.value <= startDate) {
      setEndDateError(true);
      setEndDateErrorMsg(t('END_DATE_LOWER_START_DATE'));
    } else {
      setEndDateError(false);
      setLocalEndDate(event.target.value);
      setEndDateErrorMsg('');
    }
  };

  if (cantEdit) {
    return (
      <div className="p-4">
        <Typography gutterBottom variant="h5" component="div">
          {`${t('END_DATE')}: ${endDate}`}
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-4">
      {isEdit ? (
        <form className="flex flex-row p-4">
          <TextField
            {...register('endDate')}
            InputLabelProps={{ shrink: true }}
            onChange={endDateChangeHandler}
            error={endDateError}
            defaultValue={endDate}
            helperText={endDateErrorMsg}
            label={t('END_DATE')}
            type="datetime-local"
            className="border-2 px-2 pt-2"
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
            className="cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300"
            onClick={() => setIsEdit(true)}
            gutterBottom
            variant="h5"
            component="div">
            {`${t('END_DATE')}: ${endDate}`}
          </Typography>
          {width && (
            <div>
              <Typography variant="inherit" component="div">
                {t('CLICK_EDIT')}
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default EditEventEndDate;
