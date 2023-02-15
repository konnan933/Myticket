import { Button } from '@mui/material';
import admin from 'API/Admin';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function EditEventPictures() {
  const { t } = useTranslation('adminEvent');
  const { id } = useParams();

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex  justify-center">
        <Button variant="outlined" className="w-1/2">
          {t('CHANGE_PICTURE')}
        </Button>
      </div>
      <div className="flex  justify-center">
        <img src={`${admin.eventPicture}${id}`} className="w-1/2" />
      </div>
    </div>
  );
}
export default EditEventPictures;
