import UserDetailedEvent from 'PageContent/User/UserEditEvent/UserDetailedEvent';
import i18n from '../../../i18n';
import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'userDetailedEvent', en);
i18n.addResourceBundle('hu', 'userDetailedEvent', hu);

function UserDetailedEventPage() {
  return <UserDetailedEvent />;
}

export default UserDetailedEventPage;
