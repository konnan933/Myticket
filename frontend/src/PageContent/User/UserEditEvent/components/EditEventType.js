import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent, putEvent } from 'redux/thunks/Event';
import CloseIcon from '@mui/icons-material/Close';

function EditEventType({ type }) {
  const width = useMediaQuery('(max-width:768px)');
  const { eventTypes } = useSelector((state) => state.eventTypes);
  const { t } = useTranslation('userEvent');
  const { register } = useForm();
  const [localType, setLocalType] = useState(type.ekId);

  const { singleEvent } = useSelector((state) => state.event);
  const id = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const handleOnSubmit = () => {
    const localEvent = { ...singleEvent };
    localEvent.eventType = localType;
    dispatch(putEvent(localEvent)).then(() => {
      dispatch(getSingleEvent(id));
      window.location.reload(true);
    });
  };
  const eventTypeChangeHandler = (event) => {
    setLocalType(event.target.value);
  };
  return (
    <div className="p-4">
      {isEdit ? (
        <form className="flex flex-row w-full p-4">
          <FormControl style={{ minWidth: '40%' }}>
            <InputLabel shrink={true} id="demo-simple-select-label">
              {t('EVENT_TYPE')}
            </InputLabel>
            <Select
              {...register('eventType')}
              value={localType}
              notched={true}
              label={t('EVENT_TYPE')}
              onChange={eventTypeChangeHandler}
              inputProps={{ 'aria-label': 'Without label' }}>
              {eventTypes.map((eventType) => (
                <MenuItem key={eventType.id} value={eventType.id}>
                  {t(`EVENT_TYPE_${eventType.id}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {`${t('EVENT_TYPE')}:  ${t(`EVENT_TYPE_${type.ekId}`)}`}
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
export default EditEventType;
