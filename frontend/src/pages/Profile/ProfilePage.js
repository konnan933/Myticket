import ProfileContent from 'PageContent/Profile/ProfileContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'profile', en);
i18n.addResourceBundle('hu', 'profile', hu);

function ProfilePage() {
  return <ProfileContent />;
}

export default ProfilePage;
