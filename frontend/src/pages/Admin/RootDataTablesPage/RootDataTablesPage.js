import RootDataTablesContent from 'PageContent/Admin/RootDataTables/RootDataTablesContent';
import i18n from '../../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'rootData', en);
i18n.addResourceBundle('hu', 'rootData', hu);
function RootDataTablesPage() {
  return <RootDataTablesContent />;
}

export default RootDataTablesPage;
