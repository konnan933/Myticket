import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditEvent from '../../components/EditEvent';
import SingleEventDescription from './SingleEventDescription';
function DetailedData() {
  const { t } = useTranslation('adminEvent');

  const { singleDetailedEvent } = useSelector((state) => state.admin);

  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <Typography>{t('EDIT_EVENT')}:</Typography>
        <EditEvent event={singleDetailedEvent} />
      </div>
      <div className="flex ">
        <Typography>{t('EVENTNAME')}</Typography>
        <Typography>{`: ${singleDetailedEvent.cim}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('ORGANIZER')}</Typography>
        <Typography>{`: ${singleDetailedEvent.fel_nev}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('BUISNESS_EMAIL')}</Typography>
        <Typography>{`: ${singleDetailedEvent.buisness_email}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('BUISNESS_PHON_NUM')}</Typography>
        <Typography>{`: ${singleDetailedEvent.buisness_tel}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('EVENT_TYPE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.name}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('LOCATION')}</Typography>
        <Typography>{`: ${singleDetailedEvent.postcode} ${singleDetailedEvent.district} ${
          singleDetailedEvent.street
        } ${t('STREET')} ${singleDetailedEvent.housenumber}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('START_DATE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.kezd_datum}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('END_DATE')}</Typography>
        <Typography>{`: ${singleDetailedEvent.veg_datum}`}</Typography>
      </div>
      <div className="flex ">
        <Typography>{t('COMISSION')}</Typography>
        <Typography>{`: ${singleDetailedEvent.jutalek}%`}</Typography>
      </div>
      <div className="flex ">
        <SingleEventDescription />
      </div>
      <div className="flex ">
        <Typography>{t(`STATUS`)}</Typography>
        <Typography>{`: ${t(`STATUS_${singleDetailedEvent.statusz}`)}`}</Typography>
      </div>
    </div>
  );
}

export default DetailedData;
