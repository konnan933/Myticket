import UserEditEvent from 'PageContent/User/UserEditEvent/UserDetailedEvent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'userEditEvent', en);
i18n.addResourceBundle('hu', 'userEditEvent', hu);

function UserEditEventPage() {
  return <UserEditEvent />;
}

export default UserEditEventPage;
