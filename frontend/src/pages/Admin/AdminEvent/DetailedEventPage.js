import DetailedAdminEvent from 'PageContent/Admin/AdminEvents/DetailedAdminEvent/DetailedAdminEvent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'adminEvent', en);
i18n.addResourceBundle('hu', 'adminEvent', hu);

function DetailedEventPage() {
  return <DetailedAdminEvent />;
}

export default DetailedEventPage;
