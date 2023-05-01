import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function DontHaveAccessContent() {
  const { t } = useTranslation('dontHaveAccess');
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h5" align="center">
        {t('DONT_HAVE_ACCESS')}
      </Typography>
      <div className="flex justify-center">
        <Button onClick={() => navigate('/')}>{t('SEARCH_EVENTS')}</Button>
      </div>
    </div>
  );
}

export default DontHaveAccessContent;
