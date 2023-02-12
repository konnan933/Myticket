import HomePage from '../Home/HomePage';
import i18n from '../../i18n';
import LoginPage from '../login/LoginPage';

import en from './I18n/en';
import hu from './I18n/hu';
import RegisterPage from 'pages/register/RegisterPage';
import level from './Level';
import AdminMenuList from 'PageContent/navbar/components/AdminMenuList';
import AdminUserContent from 'PageContent/Admin/AdminUsers/AdminUserContent';
import AdminEventContent from 'PageContent/Admin/AdminEvents/AdminEventContent';
import AdminUserPage from 'pages/Admin/AdminPage';

i18n.addResourceBundle('en', 'rootes', en);
i18n.addResourceBundle('hu', 'rootes', hu);

export const allRootConfig = [
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
    element: <AdminMenuList />,
    level: level.admin
  },
  {
    pageName: 'ADMINUSER',
    pagePath: '/adminUsers',
    element: <AdminUserPage />,
    level: level.user
  },
  {
    pageName: 'ADMINEVENT',
    pagePath: '/adminEvents',
    element: <AdminEventContent />,
    level: level.user
  }
];

export const navbarConfig = [
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
    element: <AdminMenuList />,
    level: level.admin
  }
];

export const adminConfig = [
  {
    pageName: 'ADMINUSER',
    pagePath: '/adminUsers',
    element: <AdminUserContent />,
    level: level.user
  },
  {
    pageName: 'ADMINEVENT',
    pagePath: '/adminEvents',
    element: <AdminEventContent />,
    level: level.user
  }
];
