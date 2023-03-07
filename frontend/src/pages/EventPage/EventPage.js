import i18n from '../../i18n';
import LoginContent from 'PageContent/login/LoginContent';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'eventPage', en);
i18n.addResourceBundle('hu', 'eventPage', hu);

function EventPage() {
  return <LoginContent />;
}

export default EventPage;
