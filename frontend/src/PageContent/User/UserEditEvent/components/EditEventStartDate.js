import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

function EditEventStartDate({ date }) {
  const { t } = useTranslation('userEvent');
  const today = moment(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-DDTHH:mm');
  const { singleEvent } = useSelector((state) => state.event);
  const { register } = useForm();
  const [startDate, setStartDate] = useState(date);
  const id = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent.startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };
  console.log('====================================');
  console.log(startDate);
  console.log('====================================');

  const startDateChangeHandler = (event) => {
    if (event.target.value <= today) {
      setStartDateError(true);
      setStartDateErrorMsg(t('START_DATE_LOWER'));
    } else {
      setStartDateError(false);
      setStartDateErrorMsg('');
    }
  };

  return (
    <div>
      {isEdit ? (
        <form className="flex flex-row w-full p-4">
          <TextField
            {...register('startDate')}
            error={startDateError}
            defaultValue={startDate}
            onSelect={(event) => setStartDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
            onChange={startDateChangeHandler}
            helperText={startDateErrorMsg}
            label={t('START_DATE')}
            type="datetime-local"
            className="border-2 px-2 pt-2"
          />
          <div className="flex justify-between">
            <IconButton onClick={() => setIsEdit(false)}>
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
            {`${t('START_DATE')}: ${date}`}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default EditEventStartDate;
