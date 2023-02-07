import HomePage from '../Home/HomePage';
import i18n from '../../i18n';
import LoginPage from '../login/LoginPage';

import en from './I18n/en';
import hu from './I18n/hu';
import RegisterPage from 'pages/register/RegisterPage';
import AdminPage from 'pages/Admin/AdminPage';
import level from './Level';

i18n.addResourceBundle('en', 'rootes', en);
i18n.addResourceBundle('hu', 'rootes', hu);

const rootConfig = [
  {
    pageName: 'HOME',
    pagePath: '/',
    element: <HomePage />,
    level: level.user
  },
  {
    pageName: 'LOGIN',
    pagePath: '/login',
    element: <LoginPage />,
    level: level.user
  },
  {
    pageName: 'REGISTER',
    pagePath: '/register',
    element: <RegisterPage />,
    level: level.user
  },
  {
    pageName: 'ADMIN',
    pagePath: '/admin',
    element: <AdminPage/>,
    level: level.admin
  },
];

export default rootConfig;
