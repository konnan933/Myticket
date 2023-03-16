import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Tooltip } from '@mui/material';

function BasketButton() {
  const { t } = useTranslation('rootes');

  return (
    <Link to="/basket">
      <Tooltip title={t('BASKET')} placement="right-start">
        <ShoppingCartIcon color="inherit" className="text-white" />
      </Tooltip>
    </Link>
  );
}
export default BasketButton;
