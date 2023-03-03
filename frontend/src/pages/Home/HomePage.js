import HomeContent from 'PageContent/Home/HomeContent';
import i18n from '../../i18n';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'home', en);
i18n.addResourceBundle('hu', 'home', hu);

function HomePage() {
  return <HomeContent />;
}

export default HomePage;
