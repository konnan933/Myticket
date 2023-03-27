import EmailVerificationContent from 'PageContent/EmailVerification/EmailVerificationContent';
import i18n from '../../i18n';
import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'email', en);
i18n.addResourceBundle('hu', 'email', hu);

function EmailVerificationPage() {
  return <EmailVerificationContent />;
}

export default EmailVerificationPage;
