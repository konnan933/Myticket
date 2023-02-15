import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddEventForm from '../AdminEventFroms/AddEventForm';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddEvent() {
  const { t } = useTranslation('adminEvent');

  return (
    <div>
      {t('ACTIONS')}
      <IconButton onClick={() => <Link to={AddEventForm}></Link>} sx={{ color: 'white' }}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
}

export default AddEvent;
