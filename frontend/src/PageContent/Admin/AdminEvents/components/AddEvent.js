import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

function AddEvent() {
  const { t } = useTranslation('adminEvent');

  return (
    <div>
      <Link to="/adminAddEvent">
        <Button variant="outlined" endIcon={<AddCircleOutlineIcon />}>
          {t('ADD_EVENT')}
        </Button>
      </Link>
    </div>
  );
}

export default AddEvent;
