import { MenuItem, Select } from '@mui/material';
import { HU, US } from 'country-flag-icons/react/3x2';
import { changeLanguage } from 'i18next';
import { useState } from 'react';

function LangChanger() {
  const [lang, setLang] = useState('hu');

  const handleChange = (event) => {
    changeLanguage(event.target.value);
    setLang(event.target.value);
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
