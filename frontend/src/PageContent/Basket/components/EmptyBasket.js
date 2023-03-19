import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function EmptyBasket() {
  const { t } = useTranslation('basket');
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center p-4">
        <div className="w-3/4 border border-solid rounded-sm">
          <Typography className="flex justify-center p-4" variant="h5" component="div">
            {t('DONT_HAVE_BASKET')}
          </Typography>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <Button onClick={() => navigate('/')}>{t('SEARCH_EVENTS')}</Button>
      </div>
    </div>
  );
}
export default EmptyBasket;
