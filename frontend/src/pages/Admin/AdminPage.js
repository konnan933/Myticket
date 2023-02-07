import AdminUserContent from 'PageContent/Admin/AdminUserContent';
import HomeContent from 'PageContent/Home/HomeContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'adminUser', en);
i18n.addResourceBundle('hu', 'adminUser', hu);

function AdminPage() {
  return <AdminUserContent />;
}

export default AdminPage;