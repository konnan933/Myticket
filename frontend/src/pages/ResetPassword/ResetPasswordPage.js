import ResetPasswordContent from 'PageContent/ResetPassword/ResetPasswordContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'password', en);
i18n.addResourceBundle('hu', 'password', hu);

function ProfilePage() {
  return <ResetPasswordContent />;
}

export default ProfilePage;
