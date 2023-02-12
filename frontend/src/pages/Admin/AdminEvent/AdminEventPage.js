import AdminEventContent from 'PageContent/Admin/AdminEvents/AdminEventContent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'adminEvent', en);
i18n.addResourceBundle('hu', 'adminEvent', hu);

function AdminEventPage() {
  return <AdminEventContent />;
}

export default AdminEventPage;
