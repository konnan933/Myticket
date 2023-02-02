import HomeContent from 'PageContent/Home/HomeContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'register', en);
i18n.addResourceBundle('hu', 'register', hu);

function HomePage() {
  return <HomeContent />;
}

export default HomePage;
