import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function EventButton({ id }) {
  const { t } = useTranslation('home');

  const navigate = useNavigate();

  return (
    <Button
      className="m-10"
      onClick={() => {
        navigate(`/event/${id}`);
      }}>
      {t('SHOW_EVENT')}
    </Button>
  );
}

export default EventButton;
