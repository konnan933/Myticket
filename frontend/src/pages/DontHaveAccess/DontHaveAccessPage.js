
import DontHaveAccessContent from 'PageContent/DontHaveAccess/DontHaveAccessContent';
import i18n from '../../i18n';
import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'dontHaveAccess', en);
i18n.addResourceBundle('hu', 'DontHaveAccess', hu);

function DontHaveAccessPage() {
  return <DontHaveAccessContent />;
}

export default DontHaveAccessPage;
