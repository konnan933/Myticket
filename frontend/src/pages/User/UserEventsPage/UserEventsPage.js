import UserEventsContent from 'PageContent/User/UserEventsContent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'userEvent', en);
i18n.addResourceBundle('hu', 'userEvent', hu);

function UserEventsPage() {
  return <UserEventsContent />;
}

export default UserEventsPage;
