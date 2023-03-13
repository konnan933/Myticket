import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { putEvent } from 'redux/thunks/Event';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from 'redux/thunks/Event';

function EditEventOneData({ value, label, field, type }) {
  const { singleEvent } = useSelector((state) => state.event);
  const [localValue, setLocalValue] = useState(value);
  const id = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation('userEvent');
  const { register } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent[field] = localValue;

    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };

  const onLocalValueChange = (event) => {
    setLocalValue(event.target.value);
  };

  return (
    <div>
      {isEdit ? (
        <form className="flex flex-row w-full p-4" onSubmit={handleOnSubmit}>
          <TextField
            {...register(field)}
            type={type}
            label={label}
            value={localValue}
            onChange={onLocalValueChange}
            className="w-3/4"
          />
          <div className="flex justify-between w-11">
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
            {`${label}: ${value}`}
          </Typography>
        </div>
      )}
    </div>
  );
}
export default EditEventOneData;
