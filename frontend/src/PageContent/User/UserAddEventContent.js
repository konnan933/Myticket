import { useTranslation } from 'react-i18next';
import UserAddEventForm from './UserAddEvent/UserAddEventForm';

function UserAddEventContent() {
  const { t } = useTranslation('adminEvent');
  return (
    <div>
      <div className="flex justify-center pb-16">
        <h2>{t('ADD_EVENT')}</h2>
      </div>
      <UserAddEventForm />
    </div>
  );
}

export default UserAddEventContent;
