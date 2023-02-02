import { useTranslation } from 'react-i18next';

function LoginContent() {
  const { t } = useTranslation('login');

  return <h1>{t('LOGIN')}</h1>;
}

export default LoginContent;
