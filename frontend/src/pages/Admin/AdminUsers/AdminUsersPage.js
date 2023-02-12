import AdminUserContent from 'PageContent/Admin/AdminUsers/AdminUserContent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'adminUser', en);
i18n.addResourceBundle('hu', 'adminUser', hu);

function AdminUsersPage() {
  return <AdminUserContent />;
}

export default AdminUsersPage;
