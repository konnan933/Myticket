import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Glass() {
  const { t } = useTranslation('home');
  return (
    <div className=" w-full h-1/10 flex justify-center items-center">
      <div
        style={{
          backgroundImage: 'linear-gradient(to left top ,#FBC95C, transparent,#FBC95C )',
          backgroundColor: '#e58e0c',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        className="mb-5 rounded-2xl flex justify-evenly items-center">
        <div className="flex justify-evenly backdrop-blur-[10px] bg-[#ffffff33]  w-2/3 h-1/2 z-10 rounded-2xl items-center p-16">
          <Typography>{t('AD_EVENT_TEXT')}</Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: 'white', color: 'white', textTransform: 'none', letterSpacing: 2 }}>
            {t('AD_EVENT_BUTTON')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Glass;
