import i18n from 'i18n';
import BasketContent from 'PageContent/Basket/BasketContent';

import en from './I18n/en';
import hu from './I18n/hu';

i18n.addResourceBundle('en', 'basket', en);
i18n.addResourceBundle('hu', 'basket', hu);

function BasketPage() {
  return <BasketContent />;
}

export default BasketPage;
