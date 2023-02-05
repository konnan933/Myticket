import HomePage from '../Home/HomePage';
import i18n from '../../i18n';
import LoginPage from '../login/LoginPage';

import en from './I18n/en';
import hu from './I18n/hu';
import RegisterPage from 'pages/register/RegisterPage';

i18n.addResourceBundle('en', 'rootes', en);
i18n.addResourceBundle('hu', 'rootes', hu);

const rootConfig = [
  {
    pageName: 'HOME',
    pagePath: '/',
    element: <HomePage />,
    level: [0]
  },
  {
    pageName: 'LOGIN',
    pagePath: '/login',
    element: <LoginPage />,
    level: [0]
  },
  {
    pageName: 'REGISTER',
    pagePath: '/register',
    element: <RegisterPage />,
    level: [0]
  }
];

export default rootConfig;
