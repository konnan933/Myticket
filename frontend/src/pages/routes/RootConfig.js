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
import AdminUsersPage from 'pages/Admin/AdminUsers/AdminUsersPage';
import AdminEventPage from 'pages/Admin/AdminEvent/AdminEventPage';
import DetailedEventPage from 'pages/Admin/AdminEvent/DetailedEventPage';
import AdminAddEventPage from 'pages/Admin/AdminEvent/AddEventPage';
import RootDataTablesPage from 'pages/Admin/RootDataTablesPage/RootDataTablesPage';
import UserAddEventPage from 'pages/User/UserAddEventPage/UserAddEventPage';
import UserEventsPage from 'pages/User/UserEventsPage/UserEventsPage';

i18n.addResourceBundle('en', 'rootes', en);
i18n.addResourceBundle('hu', 'rootes', hu);

export const allRootConfig = [
  {
    pagePath: '/',
    element: <HomePage />
  },
  {
    pagePath: '/login',
    element: <LoginPage />
  },
  {
    pagePath: '/register',
    element: <RegisterPage />
  },
  {
    pagePath: '/admin',
    element: <AdminMenuList />
  },
  {
    pagePath: '/adminUsers',
    element: <AdminUsersPage />
  },
  {
    pagePath: '/adminEvents',
    element: <AdminEventPage />
  },
  {
    pagePath: '/adminEvents/:id',
    element: <DetailedEventPage />
  },
  {
    pagePath: '/adminAddEvent',
    element: <AdminAddEventPage />
  },
  {
    pagePath: '/rootData',
    element: <RootDataTablesPage />
  },
  {
    pagePath: '/userAddEvent',
    element: <UserAddEventPage />
  },
  {
    pagePath: '/userEvents',
    element: <UserEventsPage />
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
    pageName: 'ADMIN',
    pagePath: '/admin',
    element: <AdminMenuList />,
    level: level.admin
  },
  {
    pageName: 'ADDEVENT',
    pagePath: '/userAddEvent',
    element: <UserAddEventPage />,
    level: level.user
  },
  {
    pageName: 'USEREVENTS',
    pagePath: '/userEvents',
    element: <UserEventsPage />,
    level: level.user
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
    level: level.admin
  },
  {
    pageName: 'ROOT_DATA',
    pagePath: '/rootData',
    element: <RootDataTablesPage />,
    level: level.admin
  }
];
