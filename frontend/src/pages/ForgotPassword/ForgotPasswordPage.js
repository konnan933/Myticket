import ForgotPasswordContent from 'PageContent/ForgotPassword/ForgotPasswordContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'forgot', en);
i18n.addResourceBundle('hu', 'forgot', hu);

function ForgotPasswordPage() {
  return <ForgotPasswordContent />;
}

export default ForgotPasswordPage;
