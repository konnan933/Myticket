import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { putEvent } from 'redux/thunks/Admin';

function AdminEventActions() {
  const { t } = useTranslation('adminEvent');

  const { singleEvent } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const handleAccept = (isAccepted) => {
    const localEvent = { ...singleEvent };

    localEvent.statusz = isAccepted;

    console.log(localEvent);

    dispatch(putEvent(localEvent));
  };

  return (
    <div className="flex w-full justify-evenly py-6">
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          handleAccept(3);
        }}>
        {t('DECLINE')}
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          handleAccept(1);
        }}>
        {t('ACCEPT')}
      </Button>
    </div>
  );
}
export default AdminEventActions;
