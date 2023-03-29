import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userPayAmount } from 'redux/thunks/Basket';

function CurrencyPicker({ payCurrency, setPayCurrency }) {
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.auth);
  const { basketWithDetails, basketWithDetailsLoading } = useSelector((state) => state.basket);

  return (
    <div>
      <Select
        defaultValue={payCurrency}
        value={payCurrency}
        onChange={(event) => {
          dispatch(userPayAmount({ userId: loggedUser.id, currencies: event.target.value }));
          setPayCurrency(event.target.value);
        }}>
        <MenuItem value="HUF">HUF</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
      </Select>
    </div>
  );
}
export default CurrencyPicker;
