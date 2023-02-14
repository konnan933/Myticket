import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function BackToButton() {
  const { t } = useTranslation('adminEvent');
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(-1);
  };

  return (
    <>
      <Button onClick={handleClick} startIcon={<ArrowBackIosNewIcon />} variant="outlined">
        {t('BACK_TO')}
      </Button>
    </>
  );
}
export default BackToButton;
