import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

function BasketButton() {
  const { t } = useTranslation('rootes');

  const { basketCount } = useSelector((state) => state.basket);

  return (
    <Link to="/basket">
      <Tooltip title={t('BASKET')} placement="right-start">
        <Badge
          color="info"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          overlap="circular"
          badgeContent={basketCount}>
          <ShoppingCartIcon color="inherit" className="text-white" fontSize="large" />
        </Badge>
      </Tooltip>
    </Link>
  );
}
export default BasketButton;
