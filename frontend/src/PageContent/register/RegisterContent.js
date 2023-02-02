import { useTranslation } from 'react-i18next';

function RegisterContent() {
  const { t } = useTranslation('register');

  return <h1>{t('REGISTER')}</h1>;
}

export default RegisterContent;
