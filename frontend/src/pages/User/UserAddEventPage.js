import UserAddEventContent from 'PageContent/User/UserAddEventContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'userAddEvent', en);
i18n.addResourceBundle('hu', 'userAddEvent', hu);

function UserAddEventPage() {
  return <UserAddEventContent />;
}

export default UserAddEventPage;
