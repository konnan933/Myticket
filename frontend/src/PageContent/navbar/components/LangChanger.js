import { MenuItem, Select } from '@mui/material';
import { HU, US } from 'country-flag-icons/react/3x2';
import { changeLanguage } from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from 'redux/thunks/User';

function LangChanger() {
  const [lang, setLang] = useState('hu');
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const localUser = { ...loggedUser };
    localUser.language = event.target.value;
    dispatch(updateUserProfile(localUser));
    changeLanguage(event.target.value);
    setLang(event.target.value);
    console.log(localUser);
  };

  return (
    <Select
      sx={{ color: 'white' }}
      value={lang}
      variant="standard"
      onChange={handleChange}
      inputProps={{ 'aria-label': 'Without label' }}>
      <MenuItem value={'hu'}>
        <div className="flex justify-between">
          <HU title="Hungary" className="w-5 mr-3" />
          HU
        </div>
      </MenuItem>
      <MenuItem value={'en'}>
        <div className=" flex justify-between">
          <US title="USA" className="w-5 mr-3" />
          EN
        </div>
      </MenuItem>
    </Select>
  );
}
export default LangChanger;
