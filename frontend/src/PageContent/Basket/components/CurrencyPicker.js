import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userPayAmount } from 'redux/thunks/Basket';

function CurrencyPicker({ payCurrency, setPayCurrency }) {
  const { t } = useTranslation('basket');
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.auth);
  return (
    <FormControl className="w-2/5">
      <InputLabel shrink={true} id="demo-simple-select-label">
        {t('PAYMENT_CURRENCY')}
      </InputLabel>
      <Select
        defaultValue={payCurrency}
        value={payCurrency}
        notched
        label={t('PAYMENT_CURRENCY')}
        onChange={(event) => {
          dispatch(userPayAmount({ userId: loggedUser.id, currencies: event.target.value }));
          setPayCurrency(event.target.value);
        }}>
        <MenuItem value="HUF">HUF</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
      </Select>
    </FormControl>
  );
}
export default CurrencyPicker;
