import { useTranslation } from 'react-i18next';

function BasketContent() {
  const { t } = useTranslation('basket');
  return <div className="flex justify-center">{t('BASKET')}</div>;
}
export default BasketContent;
