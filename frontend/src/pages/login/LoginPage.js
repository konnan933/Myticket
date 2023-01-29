import i18next from 'i18next';

import en from './i18n/en';
import hu from './i18n/hu';

i18next.addResourceBundle('en', 'login', en);
i18next.addResourceBundle('hu', 'login', hu);

function LoginPage() {
  return <h1>Login</h1>;
}

export default LoginPage;
