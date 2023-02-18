import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteEvent } from 'redux/thunks/Admin';

function ConfirmUserDelete({ id, setOpen }) {
  const { t } = useTranslation('adminEvent');
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    handleClose();
    dispatch(deleteEvent(id));
  };
  return (
    <div className="flex justify-evenly">
      <Button variant="outlined" onClick={handleClose}>
        {t('NO')}
      </Button>
      <Button variant="outlined" onClick={onDelete} color="error" autoFocus>
        {t('YES')}
      </Button>
    </div>
  );
}

export default ConfirmUserDelete;
