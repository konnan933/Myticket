import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Glass() {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
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
        <div className="flex justify-evenly max-md:flex-col max-md:w-4/5  max-md:h-2/3  backdrop-blur-[10px] bg-[#ffffff33]  w-2/3 h-5/6 z-10 rounded-2xl items-center ">
          <Typography>{t('AD_EVENT_TEXT')}</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/userAddEvent');
            }}
            sx={{ borderColor: 'white', color: 'white', textTransform: 'none', letterSpacing: 1 }}>
            {t('AD_EVENT_BUTTON')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Glass;
