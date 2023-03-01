import { useTranslation } from 'react-i18next';

function CantDeleteUserDialog({ userEvents }) {
  const { t } = useTranslation('adminEvent');
  return (
    <div className="p-4">
      <p>{`${userEvents[0].userName} ${t('USER_EVENTS')}`}</p>
      <br></br>
      <p>{t('CANNOT_DELETE_USER')}</p>
    </div>
  );
}

export default CantDeleteUserDialog;
