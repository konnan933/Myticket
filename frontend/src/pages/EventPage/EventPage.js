import i18n from '../../i18n';
import en from './I18n/en';
import hu from './I18n/hu';
import EventContent from 'PageContent/EventContent/EventContent';

i18n.addResourceBundle('en', 'eventPage', en);
i18n.addResourceBundle('hu', 'eventPage', hu);

function EventPage() {
  return <EventContent />;
}

export default EventPage;
